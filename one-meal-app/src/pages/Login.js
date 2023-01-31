import React from "react";
import { useState } from "react";
import "./Form.css";
import axios from "axios";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        props.setUser(response.data);
        localStorage.setItem("userId", response.data.user_id);
      })
      .catch((err) => {
        console.log(err);
        // setError(err.response.data.message)
        alert("NO USER");
      });
  };
  return (
    <div>
      <form onSubmit={submitForm}>
        <h2>Log In</h2>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          name="password"
          value={password}
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
};
export default Login;
