import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  console.log("these are NavBar's props:", props);
  return (
    <nav>
      {props.userProp.user_id ? (
        <>
          <p>Hi! {props.userProp.email} </p>
          <span
            onClick={() => {
              localStorage.removeItem("userId");
              props.setUser({});
              alert("See you!");
              window.location.href = "/login";
            }}
          >
            Log out
          </span>
        </>
      ) : (
        <>
          <Link to="/signup">Sign up</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
