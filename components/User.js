import { removeToken } from "../auth";

export const User = ({ user }) => (
  <>
    <div>{user.username}</div>
    <button onClick={removeToken}>Logout</button>
  </>
);
