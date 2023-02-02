import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
// import Popular from "./Components/Popular";
import NavBar from "./Components/NavBar";
import Pages from "./pages/Pages";
import Searched from "./pages/Searched";
import axios from "axios";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";

function App() {
  console.log(process.env.REACT_APP_API_KEY)
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
  return (
    <div className="App">
      {/* <header className="App-header">One-Meal</header> */}
      <h1> Hi {user.email} </h1>
      {/* <Pages /> */}
      <NavBar userProp={user} setUser={setUser} />
      <Routes>
        <Route path="*" element={<Login userProp={user} setUser={setUser} />} />
        <Route
          path="/home"
          element={<Home userProp={user} setUser={setUser} />}
        />
        <Route
          path="/pages"
          element={<Pages userProp={user} setUser={setUser} />}
        />
        <Route path="/searched/:input" element={<Searched />} />
        <Route path ="/recipe/:id" element={<Recipe />} />
        <Route
          path="/signup"
          element={
            user.user_id ? (
              <Navigate to="/home" />
            ) : (
              <Signup userProp={user} setUser={setUser} />
            )
          }
        />
        <Route
          path="/login"
          element={
            user.user_id ? (
              <Navigate to="/pages" />
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
