import { createChatBotMessage } from "react-chatbot-kit"

const config = {
    initialMessages: [createChatBotMessage(`Привет! Я ваш AI-помощник. Задайте мне любой вопрос!`)],
    botName: "AI Assistant",
    customStyles: {
        botMessageBox: {
            backgroundColor: "#376B7E",
        },
        chatButton: {
            backgroundColor: "#376B7E",
        },
    },
    customComponents: {
        // Можно добавить кастомные компоненты если нужно
    },
    state: {
        // Здесь можно хранить состояние чата
    },
}

export default config