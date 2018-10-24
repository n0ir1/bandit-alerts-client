import React from "react";
import io from "socket.io-client";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      username: "",
      amount: ""
    };
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = () => {
      console.log("connected f");
    };
  }

  componentWillUnmount() {
    this.socket.close();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.socket.send(
      JSON.stringify({
        event: "message",
        data: { ...this.state }
      })
    );

    this.socket.onmessage = data => {
      console.log(data);
    };

    this.setState({
      text: "",
      username: "",
      amount: ""
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={this.handleChange}
          name="username"
          value={this.state.username}
          autoComplete="off"
        />
        <input
          type="text"
          placeholder="Amount"
          onChange={this.handleChange}
          name="amount"
          value={this.state.amount}
          autoComplete="off"
        />
        <textarea
          onChange={this.handleChange}
          name="text"
          value={this.state.text}
        />
        <input type="submit" value="submit" />
      </form>
    );
  }
}
