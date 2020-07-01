const moment = require('moment-timezone')

// Connector responsible for managing the chat application content
const assistantConnector = require('../connectors/assistantConnector')

/*-------------- sendInputMessageToAssistant -----------
Receives the conversation object from the chat 
application and proceeds to send it to the watson 
assistant module
------------------------------------------------------*/
async function sendInputMessageToAssistant(payload) {
    try {
        let assistantResponse = await assistantConnector.sendMessageToAssistant(payload)

        assistantResponse.response.result.input = payload.input

        await saveConversation(assistantResponse.response.result)

        return assistantResponse.response.result

    } catch (err) {
        throw new Error(err)
    }
}

/*-------------- saveConversation -----------
Saves Watson response (MongoDB)
------------------------------------------------------*/
async function saveConversation(assistantResponse) {
    try {
        let Assistant = require('../models/assistant')
        let assistantInteraction = await Assistant.findOneAndUpdate({
            session_id: assistantResponse.context.global.session_id
        }, {
            $push: {
                conversation_history: {
                    output: assistantResponse.output,
                    context: assistantResponse.context,
                    input: assistantResponse.input,
                    createdAt: new Date(Date.UTC(moment(Date.now()).tz('America/Sao_Paulo').format('YYYY'), (moment(Date.now()).tz('America/Sao_Paulo').format('MM') - 1), moment(Date.now()).tz('America/Sao_Paulo').format('DD'), moment(Date.now()).tz('America/Sao_Paulo').format('HH'), moment(Date.now()).tz('America/Sao_Paulo').format('mm'), moment(Date.now()).tz('America/Sao_Paulo').format('ss'))),
                    createdAtTimestamp: parseInt(moment(Date.now()).tz('America/Sao_Paulo').format('X'))
                }
            }
        }, {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true
        })
        return assistantInteraction
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = {
    sendInputMessageToAssistant: sendInputMessageToAssistant
}
