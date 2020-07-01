const mongoose = require('mongoose')

/* -------------------mongoConnect----------------------
Responsible for create a mongo connection based on its
credentials
------------------------------------------------------*/
async function mongoConnect() {
    try {
        let mongo_ca = [Buffer.from(process.env.MONGODB_CERTIFICATE_BASE64, 'base64')]
        mongoose.connect(process.env.MONGODB_URL, {
            ssl: true,
            sslValidate: true,
            sslCA: mongo_ca,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            dbName: 'ibmclouddb'
        }).catch(err => {
            throw (err)
        })

        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'Mongo connection error'))
        db.once('open', console.log.bind(console, 'Mongo connection ready'))

    } catch (error) {
        throw (error)
    }
}

module.exports = {
    mongoConnect: mongoConnect
}
