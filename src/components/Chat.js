import React from 'react';

import './Chat.css';
import Message from './Message';
import defaultAvatar from '../default-avatar.png';
import { withChatkitOneToOne } from '@pusher/chatkit-client-react';

class Chat  extends React.Component {
  constructor(props){
    super(props);
    this.messageList = React.createRef();
    this.state = {
      pendingMessage: ''
    }
  }

  handleMessageKeyDown = event => {
    if (event.key === 'Enter') {
      this.handleSendMessage();
    }
  };

  handleMessageChange = event => {
    this.setState({
      pendingMessage: event.target.value
    });
  };

  handleSendMessage = () => {
    const { pendingMessage } = this.state;
    const { chatkit: { sendSimpleMessage }} = this.props;

    if (pendingMessage === '') {
      return;
    }

    sendSimpleMessage({ text: pendingMessage })
    this.setState({
      pendingMessage: ''
    });
  };

  componentDidMount(){
    this.messageList.current.scrollTop = this.messageList.current.scrollHeight;
  };

 
  render(){
    const { pendingMessage } = this.state;
    const { chatkit: { isLoading, currentUser, otherUser }, chatkit} = this.props;
     // TODO: Show messages from Chatkit
     const messages = chatkit.messages.map(m => ({
      id: m.id,
      isOwnMessage: m.sender.id === currentUser.id,
      createdAt: m.createdAt,
      // This will only work with simple messages.
      // To learn more about displaying multi-part messages see
      // https://pusher.com/docs/chatkit/reference/javascript#messages
      textContent: m.parts[0].payload.content,
    }));

      return (
        <div className="Chat">
          <div className="Chat__titlebar">
            <img
              src={defaultAvatar}
              className="Chat__titlebar__avatar"
              alt="avatar"
            />
            <div className="Chat__titlebar__details">
              <span>{isLoading ? 'Loading ....' : otherUser.name}</span>
            </div>
          </div>
          <div className="Chat__messages" ref={this.messageList}>
            {messages.map(m => (
              <Message key={m.id} {...m} />
            ))}
          </div>
          <div className="Chat__compose">
            <input
              className="Chat__compose__input"
              type="text"
              placeholder="Type a message..."
              value={pendingMessage}
              onChange={this.handleMessageChange}
              onKeyDown={this.handleMessageKeyDown}
            />
            <button className="Chat__compose__button" onClick={this.handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      );
  }
}

export default withChatkitOneToOne(Chat);