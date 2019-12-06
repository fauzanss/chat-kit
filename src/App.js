import React from 'react';
import './App.css';
import {
    ChatkitProvider,
    TokenProvider,
    withChatkit,
  } from "@pusher/chatkit-client-react"
import Login from './components/Login';
import Message from './components/Message';
  
const instanceLocator = "v1:us1:6c0b9bf6-e441-4754-a771-a9b871c503be"
const tokenProvider = new TokenProvider({
    url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/6c0b9bf6-e441-4754-a771-a9b871c503be/token",
});

const sample = {
    id: 0,
    isOwnMessage: false,
    createdAt: '01/01/2019',
    textContent: 'Hi there! This is hardcoded message.',
}
function App() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    const otherUserId = urlParams.get('otherUserId');
    
    if(userId && otherUserId) {
        return (
            <div className="App">
                <ChatkitProvider
                instanceLocator={instanceLocator}
                tokenProvider={tokenProvider}
                userId={userId}
                >
                <WelcomeMessage />
                <Message {...sample}/>
                </ChatkitProvider>
            </div>
        );
    }

    return <Login /> 
}

// High Order Component (HOC)
const WelcomeMessage = withChatkit(props => {
    return (
      <div>
        {props.chatkit.isLoading
          ? 'Connecting to Chatkit...'
          : `Hello ${props.chatkit.currentUser.name}!`}
      </div>
    );
  });
  
export default App;
