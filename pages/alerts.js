import React from "react";

export default class Alerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: {}
    };
  }
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001/");
    this.socket.onopen = () => {
      console.log("connected a");
      this.socket.onmessage = data => {
        console.log(data);
        this.setState({
          messages: data
        });
        console.log(messages);
      };
    };
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    const { messages } = this.state;
    return <div>{messages.text}</div>;
  }
}
