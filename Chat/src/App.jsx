import './App.css'
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'

import config from './chatbot/config.js';
import MessageParser from './chatbot/MessageParser.jsx';
import ActionProvider from './chatbot/ActionProvider.jsx';
import ImageButton from '../src/assets/ButtonImage.svg'

function App() {
    // const handleOpenChatbot = () => {
    //    console.log('open window chat');
    // }

  return (
    <>
      <div>
          {/*<div className={"ImageContainer"} onClick={handleOpenChatbot}>*/}
          {/*    <img src={ImageButton} alt=""/>*/}
          {/*</div>*/}
          <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
          />
      </div>
    </>
  )
}

export default App
