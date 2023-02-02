import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import Home from "./pages/Home";
import NavBar from "./Components/NavBar";
// import Pages from "./pages/Pages";
import axios from "axios";
import Popular from "./Components/Popular";

function App() {
  const [user, setUser] = useState({});
  const fetchUser = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}`)
        .then((response) => {
          console.log(response);
          const usersAPIResCopy = response.data.map((user) => {
            return {
              ...user,
            };
          });
          setUser(usersAPIResCopy);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(fetchUser, []);
  // const URL = "http://127.0.0.1:5000/user";

  return (
    <div className="App">
      {/* <header className="App-header">One-Meal</header> */}
      <h1> Hi {user.email} </h1>
      {/* <Pages /> */}
      <NavBar userProp={user} setUser={setUser} />
      <Routes>
        <Route path="/home" element={<Home userProp={user} />} />
        <Route
          path="/popular"
          element={<Popular userProp={user} setUser={setUser} />}
        />
        <Route
          path="/signup"
          element={
            user.user_id ? (
              <Navigate to="popular" />
            ) : (
              <Signup userProp={user} setUser={setUser} />
            )
          }
        />
        <Route
          path="/login"
          element={
            user.user_id ? (
              <Navigate to="/popular" />
            ) : (
              <Login userProp={user} setUser={setUser} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
