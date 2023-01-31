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
            }}
          >
            Logout
          </span>
          <Link to="/home">Home</Link>
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