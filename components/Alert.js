import React from "react";
import styled, { keyframes } from "styled-components";

const bounceIn = keyframes`
0% {
  transform: scale(0);
}
50% {
  transform: scale(1.3);
}
100% {
  transform: scale(1);
}
`;

const Animation = styled.div`
  animation: ${bounceIn} 1s;
`;

const User = styled.div`
  font-size: 20px;
`;

const Picture = styled.div`
  background: url("https://i.gifer.com/8iwS.gif") no-repeat -50px -45px;
  display: block;
  width: 380px;
  height: 270px;
`;

const Text = styled.div`
  font-size: 13px;
  width: 300px;
  word-wrap: break-word;
`;

const Amount = styled.div`
  font-size: 45px;
`;

const AlertContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const timeOut = 10000;

export default class Alert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: false,
      lang: "ru-RU",
      rate: 0.8,
      pitch: 1,
      volume: 2
    };
  }

  componentDidMount() {
    this.synth = window.speechSynthesis;
    this.show();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.clear();
      this.show();
    }
  }

  componentWillUnmount() {
    this.synth.cancel();
    this.clear();
  }

  speak = text => {
    const utterThis = new SpeechSynthesisUtterance();
    utterThis.text = text;
    utterThis.lang = this.state.lang;
    utterThis.rate = this.state.rate;
    utterThis.pitch = this.state.pitch;
    utterThis.volume = this.state.volume;

    utterThis.addEventListener("start", e => {
      this.time = e.timeStamp;
    });

    utterThis.addEventListener("end", e => {
      this.time = e.timeStamp - this.time;

      if (this.time < timeOut) {
        const delay = timeOut - this.time;
        this.timer = setTimeout(this.hide, delay);
      } else {
        this.hide();
      }
    });

    this.synth.speak(utterThis);
  };

  hide = () => {
    this.setState({ isShow: false });
  };

  show = () => {
    this.setState({ isShow: true });
    this.speak(this.props.text);
  };

  clear = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  render() {
    const { username, amount, text } = this.props;
    return (
      this.state.isShow && (
        <Animation>
          <AlertContainer>
            <Amount>{`Сумма ${amount}₽`}</Amount>
            <Picture />
            <User>{`От ${username}`}:</User>
            <Text>{text}</Text>
          </AlertContainer>
        </Animation>
      )
    );
  }
}
