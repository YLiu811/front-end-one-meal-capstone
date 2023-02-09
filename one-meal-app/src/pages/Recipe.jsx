import React from "react";
// import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";

function Recipe() {
    console.log("single recipe page is called")
    const URL = "https://api.spoonacular.com/recipes/";

    const params = useParams();
    const [recipe, setRecipe] = useState({});
    const [active, setActive] = useState('Ingredients');

    const getRecipe = async () => {
        const api = await fetch(`${URL}${params.id}/information?apiKey=b7a6c9d38b904685a82e32c6e9ebc999`)
        const res = await api.json();
        // console.log(res);
        setRecipe(res);
        console.log(res.summary);
        console.log(res.instructions);
    };

    useEffect(() => {
        getRecipe();
    }, [params.id]);
    
    // const [favorites, setFavorites] = useState([])
    // const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    // const addFave = (recipe) => {
    //     console.log('add to fave clicked')
    //     axios.post(`${REACT_APP_BACKEND_URL}/favorites`, recipe)
    //     .then((response)=>{
    //     const newFaves = [...favorites];
    //     const newFaveJSON={
    //         ...recipe,
    //         "userId": response.data.id
    //     }
    //     newFaves.push(newFaveJSON);
    //     setFavorites(newFaves); //this method does not require a .get request; we are pushing the Fave data to the Faves list and using the setter to trigger a rerender.
    //     })
    //     .catch((error)=>{
    //     console.log(error);
    //     });
    // }
    
    // const removeFave = (faveId) => {
    //     console.log('remove fave clicked')
    //     axios
    //     .delete(`${REACT_APP_BACKEND_URL}/favorites/${faveId}`)
    //     .then(() => {
    //         const newFaves = [];
    //         for (const fave of favorites) {
    //         if (fave.id !== faveId) {
    //             newFaves.push(fave);
    //         }
    //     }
    //     setFavorites(newFaves);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    // }

    const { favorites, addToFave, removeFave } = useAppContext();
    console.log(`favorites: ${favorites}`);
    const favoritesCheck = (id) => {
        const found = favorites.some((recipe) => recipe.id === id);
        return found;
    };

    return (
        <RecipeWrapper>
            <div>
                <div>
                {favoritesCheck(recipe.id) ? (
                    <Button onClick={() => removeFave(recipe.id)}>Remove from Favorites</Button>
                ) : (
                    <Button onClick={() => addToFave(recipe)}>Add to Favorites</Button>)}
                </div>
                <h2>{recipe.title}</h2>
                <img src={recipe.image} alt={recipe.title} />
            </div>
            <Info>
                <Button className={active === 'Ingredients' ? 'active' : ''} onClick={() => setActive('Ingredients')}>Ingredients</Button>
                <Button className={active === 'Instructions' ? 'active' : ''} onClick={() => setActive('Instructions')}>Instructions</Button>
                {/* <h3 dangerouslySetInnerHTML={{__html: recipe.summary}}></h3> */}
                {/* <h3 dangerouslySetInnerHTML={{__html: recipe.instructions}}></h3> */}
                <div>
                    {active === 'Instructions' && (
                        <div>
                            <h3 dangerouslySetInnerHTML={{__html: recipe.summary}}></h3>
                            <h3 dangerouslySetInnerHTML={{__html: recipe.instructions}}></h3>
                        </div>
                    )}
                    {active === 'Ingredients' && (
                        <ul>
                        {recipe.extendedIngredients?.map((detail) => 
                            <li key={detail.id}>{detail.original}</li>
                        )}
                        </ul>
                    )}
                </div>
            </Info>
        </RecipeWrapper>
    );
}

const RecipeWrapper = styled.div`
    margin-left: 0;
    margin-top: 2rem;
    margin-bottom: 6rem;
    display: flex;
    .active{
        background-color: linear-gradient(35deg, #FFC0B9, #FF8474);
        color: #8FDF83;
    }
    h2 img{
        margin-left: 2rem;
        text-align: center;
        align-items: center;
    }
    h3{
        margin-bottom: 2rem;
        line-height: 1.5rem;
        margin-left: 4.5rem;
        text-align: left;
    }
    li{
        font-size: 1.2rem;
        line-height: 2.5rem;
        margin-left: 3.5rem;
        text-align: left;
    }
    ul{
        margin-top: 2rem;
        margin-left: 2rem;
    }
`
const Button = styled.div`
    padding: 1rem 2rem;
    height: 3rem;
    color: #A3A0CB;
    background: #FFF7EE;
    border: 2px solid #FF8474;
    margin: 2rem 4rem 2rem;
    font-weight: 600;
`

const Info = styled.div`
    text-align: initial;
    height: auto;
    display: block;
    margin-left: 10rem;
    
    buttonContainer = {
        position: relative;
        transition: transform 0.2s;
        &:hover{
            cursor: pointer;
            transform: scale(1.1);
    }
    buttonContainer:hover .overlay{
        opacity: 1;
    }
    overlay = {
        align-items: center;
        justify-content: center;
        position: absolute;
        background: #FF8474;
        width: 100%;
        transition: 0.5s ease;
        opacity: 0;
        bottom: 0;
        font-size: 1.2rem;
        padding: 0.5;
        text-align: center;
    }
`;

export default Recipe;