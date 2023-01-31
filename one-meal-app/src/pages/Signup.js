import React from "react";
import { useState } from "react";
import axios from "axios";
import "./Form.css";

export const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/signup`, {
        name,
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        props.setUser(response.data);
        localStorage.setItem("userId", response.data.id);
      })
      .catch((error) => {
        console.log(error);
        alert("USER Exist please log in");
      });
  };
  return (
    <div>
      <form onSubmit={submitForm}>
        <h2>Sign Up</h2>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="User Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
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
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
};
export default Signup;
