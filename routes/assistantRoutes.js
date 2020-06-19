const assistantRoutes = require('express').Router()
const assistantController = require('../controllers/assistantController')

assistantRoutes.post('/', async function (req, res, next) {
    try {
        let result = await assistantController.sendInputMessageToAssistant(req.body).catch(err => { throw new Error(err) })
        res.status(200).send(result.result)
    }
    catch (err) {
        next(err.message)
    }
})

module.exports = assistantRoutes
