const API_URL = "http://localhost:8000/ask"

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
        this.createChatBotMessage = createChatBotMessage
        this.setState = setStateFunc
        this.createClientMessage = createClientMessage
    }

    handleUserMessage(message) {
        console.log("Отправляем сообщение:", message)

        // Показываем индикатор загрузки
        const loadingMessage = this.createChatBotMessage("Думаю...")

        this.setState((prev) => ({
            ...prev,
            messages: [...prev.messages, loadingMessage],
        }))

        // Убедимся, что сообщение не пустое и правильно форматировано
        const cleanedMessage = message.trim()
        if (!cleanedMessage) {
            const errorMessage = this.createChatBotMessage("Пожалуйста, введите вопрос")
            this.updateChatbotState(errorMessage, true)
            return
        }

        console.log("Отправляем запрос на:", API_URL)
        console.log("Данные запроса:", { question: cleanedMessage })

        // Используем Promise вместо async/await
        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question: cleanedMessage }),
        })
            .then((response) => {
                console.log("Статус ответа:", response.status)
                console.log("Headers ответа:", response.headers)

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                return response.json()
            })
            .then((data) => {
                console.log("Полученные данные:", data)

                let answer = data.answer || "Получен пустой ответ от сервера"

                // Проверяем, не получили ли мы сообщение о непонимании
                if (answer === "Не удалось понять вопрос.") {
                    answer =
                        "Извините, я не смог понять ваш вопрос. Пожалуйста, попробуйте переформулировать или задать другой вопрос."
                }

                // Обработка ссылок в ответе
                const match = answer.match(/http[^\s"]+/)
                if (match) {
                    const url = match[0]
                    answer = answer.replace(url, "").replace("Ссылка:", "").trim()
                    answer += `\n\nСсылка: ${url}`
                }

                console.log("Обработанный ответ:", answer)

                // Удаляем сообщение загрузки и добавляем ответ
                const botMessage = this.createChatBotMessage(answer)
                this.updateChatbotState(botMessage, true)
            })
            .catch((error) => {
                console.error("Полная ошибка:", error)
                console.error("Тип ошибки:", error.name)
                console.error("Сообщение ошибки:", error.message)

                let errorMessage = "Произошла ошибка при обращении к серверу."

                if (error.name === "TypeError" && error.message.includes("fetch")) {
                    errorMessage = "Не удается подключиться к серверу. Проверьте, что сервер запущен на http://localhost:8000"
                } else if (error.message.includes("CORS")) {
                    errorMessage = "Ошибка CORS. Проверьте настройки сервера."
                }

                const botErrorMessage = this.createChatBotMessage(errorMessage)
                this.updateChatbotState(botErrorMessage, true)
            })
    }

    // Вспомогательный метод для обновления состояния чатбота
    updateChatbotState(message, removeLoading = false) {
        this.setState((prev) => {
            // Если нужно удалить сообщение загрузки
            if (removeLoading) {
                return {
                    ...prev,
                    messages: [...prev.messages.slice(0, -1), message],
                }
            }
            // Иначе просто добавляем новое сообщение
            return {
                ...prev,
                messages: [...prev.messages, message],
            }
        })
    }
}

export default ActionProvider
