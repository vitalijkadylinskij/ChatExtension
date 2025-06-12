import "./App.css"
import Chatbot from "react-chatbot-kit"
import "react-chatbot-kit/build/main.css"

import config from "./chatbot/config.js"
import MessageParser from "./chatbot/MessageParser.jsx"
import ActionProvider from "./chatbot/ActionProvider.jsx"

function App() {
    return (
        <div className="App">
            <div className="chatbot-container">
                <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
            </div>
        </div>
    )
}

export default App

