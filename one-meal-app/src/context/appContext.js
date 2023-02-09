import { createContext, useContext } from "react";
import { useState } from "react";
// import axios from "axios";

// const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AppContext = createContext(null);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("AppContext must be within appContextProvider!");
  }
  return context;
};

const AppContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFave = (recipe) => {
    console.log("add to fave clicked");
    // axios.post(`${REACT_APP_BACKEND_URL}/favorites`)
    // .then((response)=>{
    const newFaves = [...favorites];
    const newFaveJSON = {
      ...recipe,
      // "userId": response.data.user_id
    };
    newFaves.push(newFaveJSON);
    setFavorites(newFaves); //this method does not require a .get request; we are pushing the Fave data to the Faves list and using the setter to trigger a rerender.
  };
  // .catch((error)=>{
  // console.log(error);
  // });

  const removeFave = (id) => {
    console.log("remove fave clicked");
    // axios
    // .delete(`${REACT_APP_BACKEND_URL}/favorites/${id}`)
    // .then(() => {
    const newFaves = [];
    for (const fave of favorites) {
      if (fave.id !== id) {
        newFaves.push(fave);
      }
    }
    setFavorites(newFaves);
    // })
    // .catch((err) => {
    //     console.log(err);
    // });
  };
  return (
    <AppContext.Provider value={{ favorites, addToFave, removeFave }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
