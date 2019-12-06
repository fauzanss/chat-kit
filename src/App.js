import React from 'react';
import './App.css';
import {
    ChatkitProvider,
    TokenProvider,
    withChatkit,
  } from "@pusher/chatkit-client-react"
import Login from './components/Login';
  
const instanceLocator = "v1:us1:6c0b9bf6-e441-4754-a771-a9b871c503be"
const userId = "fau"
const tokenProvider = new TokenProvider({
    url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/6c0b9bf6-e441-4754-a771-a9b871c503be/token",
});

function App() {
  return (
    <div className="App">
        <ChatkitProvider
        instanceLocator={instanceLocator}
        tokenProvider={tokenProvider}
        userId={userId}
        >
          <WelcomeMessage />
        </ChatkitProvider>
        <Login />
    </div>
  );
}
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
