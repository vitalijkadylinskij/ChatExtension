import { createChatBotMessage } from "react-chatbot-kit"

const config = {
    initialMessages: [createChatBotMessage(`Привет! Я ваш AI-помощник. Задайте мне любой вопрос!`)],
    botName: "AI Assistant",
    customStyles: {
        botMessageBox: {
            backgroundColor: "#D96EFF",
        },
        chatButton: {
            backgroundColor: "#D96EFF",
        },
    },
    customComponents: {},
    state: {},
}

export default config