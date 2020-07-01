const AssistantV2 = require('ibm-watson/assistant/v2')
const { IamAuthenticator } = require('ibm-watson/auth')

var assistant = new AssistantV2({
    version: '2020-04-01',
    authenticator: new IamAuthenticator({
        apikey: process.env.APIKEY,
    }),
    url: process.env.URL
})

/* ------------ createAssistantSession -----------------
Create a new session that will be used to send user input 
to a skill
------------------------------------------------------*/
async function createAssistantSession() {
    try {
        let sessionObject = await assistant.createSession({
            assistantId: process.env.ASSISTANT_ID
        })

        return sessionObject.result.session_id
    } catch (err) {
        throw new Error(err)
    }
}


/* ------------ sendMessageToAssistant -----------------
Receives a string containing the user's input text 
and sends it to Watson Assistant service
------------------------------------------------------*/
async function sendMessageToAssistant(payload) {
    try {

        var session_id = payload.session_id
        if (!session_id) session_id = await createAssistantSession()

        payload.input.options = {
            return_context: true
        }

        var assistantResponse = await assistant.message({
            assistantId: process.env.ASSISTANT_ID,
            sessionId: session_id,
            input: {
                text: payload.input,
                options: {
                    return_context: true
                }
            },
            context: payload.context ? payload.context : null
        })

        let response = {
            session_id: session_id,
            response: assistantResponse
        }
        return response
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = {
    sendMessageToAssistant: sendMessageToAssistant
}
