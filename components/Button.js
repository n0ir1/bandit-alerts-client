import styled from "styled-components";
import { darken, lighten } from "polished";

const Button = styled.button`
  color: ${({ color }) => color};
  background-color: transparent;
  background-image: none;
  border: 1px solid ${({ color }) => color};
  display: inline-flex;
  justify-content: center;
  width: ${({ full }) => (full ? "100%" : "auto")};
  text-align: center;
  user-select: none;
  cursor: pointer;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  outline: none;
  border-radius: 0.25rem;

  &:hover {
    color: ${({ color }) => darken(0.5, color)};
    border: 1px solid ${({ color }) => darken(0.5, color)};
  }

  &:disabled {
    color: ${({ color }) => lighten(0.3, color)};
    cursor: default;
    border: 1px solid ${({ color }) => lighten(0.3, color)};
  }
`;

export default ({
  onClick = () => {},
  children,
  label = "",
  color = "#6c757d",
  full = false,
  disabled = false
}) => (
  <Button onClick={onClick} full={full} color={color} disabled={disabled}>
    {label ? label : children}
  </Button>
);
