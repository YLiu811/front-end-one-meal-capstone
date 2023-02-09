import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { useAppContext } from "../context/appContext";

const Favorite = () => {
    // const { favorites, addToFave, removeFave } = useAppContext();
    const { favorites, addToFave } = useAppContext();
    // console.log(`favorites: ${favorites}`);
    // const favoritesCheck = (id) => {
    //     const found = favorites.some((recipe) => recipe.id === id);
    //     return found;
    // };

    return (
        <div className='container'>
            <div className='overlay'>
                <FaHeart onClick={() => addToFave}></FaHeart>
            </div>
        </div>
    )
}

export default Favorite
