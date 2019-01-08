import React from "react";
import styled from "styled-components";
import { lighten } from "polished";

const Row = styled.div`
  margin: 8px;
  border: 0;
  display: flex;
  padding: 0;
  z-index: 0;
  position: relative;
  min-width: 0;
  flex-direction: column;
  vertical-align: top;
`;

const Label = styled.label`
  color: ${({ isFocus, theme }) =>
    isFocus ? lighten(0.1, theme.blue) : lighten(0.45, theme.black)};
  padding: 0;
  ${({ error, theme }) => (error ? `color: ${theme.red}` : null)};
  line-height: 1;
  transform-origin: top left;
  top: 0;
  left: 0;
  position: absolute;
  transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  transform: ${({ isFocus, text }) =>
    isFocus || text
      ? "translate(0, 1.5px) scale(0.75)"
      : `translate(0, 24px) scale(1)`};
`;

const InputWrap = styled.div`
  position: relative;
  cursor: text;
  display: inline-flex;
  font-size: 1rem;
  line-height: 1.1875em;
  align-items: center;
  ${Label} + & {
    margin-top: 16px;
  }
  &:before {
    left: 0;
    right: 0;
    bottom: 0;
    content: "\00a0";
    position: absolute;
    transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 10ms;
    border-bottom: 1px solid ${({ theme }) => lighten(0.45, theme.black)};
    ${({ error, theme }) =>
      error ? `border-bottom: 2px solid ${theme.red}` : null};
    pointer-events: none;
  }
  &:hover:before {
    border-bottom: 2px solid ${({ theme }) => lighten(0.2, theme.black)};
    ${({ error, theme }) =>
      error ? `border-bottom: 2px solid ${theme.red}` : null};
  }
  &:after {
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    transform: "scaleX(${({ isFocus }) => (isFocus ? "1px" : "0")})";
    position: absolute;
    transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    border-bottom: ${({ isFocus, theme }) =>
      isFocus
        ? `2px solid ${theme.blue}`
        : `1px solid ${lighten(0.2, theme.black)}`};
    ${({ error, theme }) => (error ? `border-bottom: 2px ${theme.red}` : null)};
    pointer-events: none;
  }
`;

const Input = styled.input`
  width: 100%;
  border: 0;
  margin: 0;
  padding: 6px 0 7px;
  display: block;
  min-width: 0;
  box-sizing: content-box;
  background: none;
  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
  border: none;
  margin: 0;
  width: 100%;
  display: block;
  padding: 6px 0 7px;
  background: none;
  box-sizing: content-box;
  resize: none;
  &:focus {
    outline: none;
  }
`;

class TextField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      onFocus: false
    };
  }

  static defaultProps = {
    name: "",
    value: "",
    type: "text",
    onChange: () => {},
    onBlur: () => {},
    error: "",
    placeholder: ""
  };

  onTextFieldFocus = e => {
    this.setState({ onFocus: true });
  };

  onTextFieldBlur = e => {
    this.props.onBlur(e);
    this.setState({ onFocus: false });
  };

  render() {
    const { name, value, placeholder, type, error } = this.props;
    return (
      <Row>
        <Label isFocus={this.state.onFocus} text={value} error={error}>
          {placeholder}
        </Label>
        <InputWrap isFocus={this.state.onFocus} error={error}>
          {this.props.multiline ? (
            <TextArea
              type={type}
              value={value}
              onBlur={this.onTextFieldBlur}
              onFocus={this.onTextFieldFocus}
              autoFocus={this.props.autoFocus}
              autoComplete={this.props.autoComplete}
              onChange={this.props.onChange}
              name={name}
            />
          ) : (
            <Input
              type={type}
              value={value}
              onBlur={this.onTextFieldBlur}
              onFocus={this.onTextFieldFocus}
              autoFocus={this.props.autoFocus}
              autoComplete={this.props.autoComplete}
              onChange={this.props.onChange}
              name={name}
            />
          )}
        </InputWrap>
      </Row>
    );
  }
}

export default TextField;
