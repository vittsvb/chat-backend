// Connector responsible for managing the chat application content
var assistantConnector = require("../connectors/assistantConnector")

/*-------------- sendInputMessage --------------------
Receives the conversation object from the chat 
application and proceeds to send it to the watson 
assistant module
------------------------------------------------------*/
async function sendInputMessageToAssistant(payload) {
    try {
        let assistantResponse = await assistantConnector.sendMessageToAssistant(payload)
        return assistantResponse;

    } catch (err) {
        throw (err)
    }
}

module.exports = {
    sendInputMessageToAssistant: sendInputMessageToAssistant
}