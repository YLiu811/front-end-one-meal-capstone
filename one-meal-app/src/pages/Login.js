import React from "react";
import { useState } from "react";
import axios from "axios";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
        email,
        password,
      })
      .then(
        (response) => {
          console.log(response);
          props.setUser(response.data);
          localStorage.setItem("userId", response.data.user_id);
          setSuccess(true);
        },
        [props.user]
      )
      .catch((err) => {
        console.log(err);
        // setError(err.response.data.message)
        alert("NO USER FOUND");
      });
  };
  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href={"/home"}>Welcome! Visit Home</a>
          </p>
        </section>
      ) : (
        <div>
          <section>
            <form onSubmit={submitForm}>
              <h1>Log In</h1>
              <input
                type="text"
                name="email"
                value={email}
                required
                placeholder="Input your Email"
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
              <input type="submit" value="Log In" />
            </form>
          </section>
        </div>
      )}
    </>
  );
};
export default Login;
