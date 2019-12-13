import React from 'react';
import './App.css';
import {
    ChatkitProvider,
    TokenProvider
  } from "@pusher/chatkit-client-react"
import Login from './components/Login';
import Chat from './components/Chat';
  
const instanceLocator = "v1:us1:6c0b9bf6-e441-4754-a771-a9b871c503be"
const tokenProvider = new TokenProvider({
    url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/6c0b9bf6-e441-4754-a771-a9b871c503be/token",
});


function App() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    const otherUserId = urlParams.get('otherUserId');
    
    if(userId && otherUserId) {
        return (
            <div className="App">
                <div className="App__chatwindow">
                    <ChatkitProvider
                        instanceLocator={instanceLocator}
                        tokenProvider={tokenProvider}
                        userId={userId}
                    >
                        <Chat otherUserId={otherUserId} />
                    </ChatkitProvider>
                </div>
            </div>
        );
    }

    return (
        <div className="App">
            <Login />
        </div>
    ) 
}

export default App;
