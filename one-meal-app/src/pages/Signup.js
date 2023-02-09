import React from "react";
import { useState } from "react";
import axios from "axios";

export const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/signup`, {
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
        alert("USER Already Existed");
      });
  };
  return (
    <div>
      <section>
        <form onSubmit={submitForm}>
          <h2>Sign Up</h2>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Choose Your User Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Register with Your Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            name="password"
            value={password}
            placeholder="Type your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input type="submit" value="Sign Up" />
        </form>
      </section>
    </div>
  );
};
export default Signup;
