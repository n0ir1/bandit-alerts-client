import React from "react";
import styled from "styled-components";
import { lighten, darken } from "polished";

const THEME = {
  size: "10px",
  get SIZE() {
    return parseFloat(this.size, 10);
  },
  SET_SIZE(value) {
    return (this.size = value);
  },
  get INPUT_PADDING() {
    return `${1.7 * this.SIZE}px`;
  },
  get INPUT_FONT_SIZE() {
    return `${1.4 * this.SIZE}px`;
  },
  get LABEL_FOCUS_FONT_SIZE() {
    return `${1.2 * this.SIZE}px`;
  },
  get FIELD_PADDING() {
    return `${0.8 * this.SIZE}px`;
  },
  get LABEL_FOCUS_TOP() {
    return `${0.6 * this.SIZE}px`;
  },
  get LABEL_TOP() {
    return `${parseFloat(this.INPUT_PADDING) +
      1.5 * parseFloat(this.FIELD_PADDING)}px`;
  }
};

const Label = styled.label`
  color: ${({ theme, error, isFocus }) =>
    error && !isFocus
      ? theme.red
      : isFocus
      ? theme.blue
      : lighten(0.6, theme.black)};
  font-size: ${({ isFocus, text }) =>
    isFocus || text ? THEME.LABEL_FOCUS_FONT_SIZE : THEME.INPUT_FONT_SIZE};
  left: 0;
  line-height: ${THEME.INPUT_FONT_SIZE};
  pointer-events: none;
  position: absolute;
  top: ${({ isFocus, text }) =>
    isFocus || text ? THEME.LABEL_FOCUS_TOP : THEME.LABEL_TOP};
  transition-duration: 0.35s;
  transition-property: top, font-size, color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
`;

const InputProps = ({ error, theme }) => `
  background-color: transparent;
  border: none;
  border-bottom: 1.5px solid ${lighten(0.45, theme.black)};
  ${error &&
    `margin-top: 1px;
    border-bottom-color: ${theme.red};
  `}
  border-radius: 0;
  color: ${theme.black};
  display: flex;
  font-size: ${THEME.INPUT_FONT_SIZE};
  outline: none;
  padding: ${THEME.FIELD_PADDING} 0;
  width: 100%;

  &:hover {
    border-bottom-color: ${
      error ? darken(0.2, theme.red) : lighten(0.2, theme.black)
    };
  }
`;

const Bar = styled.span`
  display: flex;
  position: relative;
  width: 100%;

  &::before,
  &::after {
    background-color: ${({ theme }) => theme.blue};
    bottom: 0;
    content: "";
    height: 2px;
    position: absolute;
    transition-duration: 0.2s;
    transition-property: width, background-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    width: ${({ isFocus }) => (isFocus ? "50%" : 0)};
  }

  &::before {
    left: 50%;
  }

  &::after {
    right: 50%;
  }
`;

const Input = styled.input`
  ${InputProps}
`;

const TextArea = styled.textarea`
  ${InputProps}
  resize: none;
`;

const Row = styled.div`
  position: relative;
  padding-top: ${THEME.INPUT_PADDING};
  padding-bottom: ${parseInt(THEME.INPUT_PADDING, 10) / 3}px;
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
    size: "10px",
    type: "text",
    onChange: () => {},
    onBlur: () => {},
    error: "",
    placeholder: "",
    multiline: false
  };

  handleChange = e => {
    this.props.onChange(e);
  };

  onTextFieldFocus = e => {
    this.setState({ onFocus: true });
  };

  onTextFieldBlur = e => {
    this.props.onBlur(e);
    this.setState({ onFocus: false });
  };

  render() {
    const {
      name,
      value,
      placeholder,
      type,
      error,
      multiline,
      maxlength,
      size,
      ...others
    } = this.props;
    const inputElementProps = {
      ...others,
      name,
      error,
      value,
      type,
      onChange: this.handleChange,
      isFocus: this.state.onFocus,
      onBlur: this.onTextFieldBlur,
      onFocus: this.onTextFieldFocus,
      maxLength: maxlength
    };
    THEME.SET_SIZE(size);
    return (
      <Row>
        {multiline ? (
          <TextArea {...inputElementProps} />
        ) : (
          <Input {...inputElementProps} />
        )}
        <Bar isFocus={this.state.onFocus} />
        <Label isFocus={this.state.onFocus} text={value} error={error}>
          {placeholder}
        </Label>
      </Row>
    );
  }
}

export default TextField;
