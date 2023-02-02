import { Link } from "react-router-dom";
import React from "react";

const NavBar = (props) => {
  console.log("these are NavBar's props:", props);
  return (
    <nav>
      {props.userProp.user_id ? (
        <>
          <span
            onClick={() => {
              localStorage.removeItem("userId");
              props.setUser({});
              alert("See you!");
              window.location.href = "/login";
            }}
          >
            Logout
          </span>
          <Link to="/pages">Pages</Link>
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
