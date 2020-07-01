const mongoose = require('mongoose')
const moment = require('moment-timezone')

var assistantSchema = new mongoose.Schema({
    conversation_history: {
        type: [Object]
    },
    session_id: {
        type: String
    },
    createdAt: {
        type: Date,
        default: () => {
            return new Date(Date.UTC(moment(Date.now()).tz('America/Sao_Paulo').format('YYYY'), (moment(Date.now()).tz('America/Sao_Paulo').format('MM') - 1), moment(Date.now()).tz('America/Sao_Paulo').format('DD'), moment(Date.now()).tz('America/Sao_Paulo').format('HH'), moment(Date.now()).tz('America/Sao_Paulo').format('mm'), moment(Date.now()).tz('America/Sao_Paulo').format('ss')))
        }
    },
    createdAtTimestamp: {
        type: Number,
        default: () => {
            return moment(Date.now()).tz('America/Sao_Paulo').format('X')
        }
    }
})

module.exports = mongoose.model(process.env.ASSISTANT_SCHEMA, assistantSchema, process.env.ASSISTANT_SCHEMA)
