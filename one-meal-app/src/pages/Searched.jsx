import React from 'react'
// import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Favorite from '../Components/Favorite';

function Searched() {
    console.log("searched page is called")
    const [searchedFood, setSearchedFood] = useState([]);
    const params = useParams();
    
    const getResult = async (keyword) => {
        // const checkRecipe = localStorage.getItem('searchedFood');
        // console.log(checkRecipe);
        // if (checkRecipe) {
        //     setSearchedFood(JSON.parse(checkRecipe));
        // } else {
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=88cbb41354b04d13858d7f377e338113&query=${keyword}&number=18`)
        const res = await api.json();
        // localStorage.setItem('searchedFood', JSON.stringify(res.recipes))
        setSearchedFood(res.results);
        console.log(res.results);
    };
    
    useEffect(() => {
        getResult(params.input);
    }, [params.input]);

    return (
        <div>
            <h2>Recommended Recipes</h2>
            <Grid>
                {searchedFood.map((recipe) => {
                    return(
                        <Card key={recipe.id}>
                            <div className='container'>
                                <div className='overlay'>
                                    <h4>{recipe.title}</h4>
                                    <Favorite />
                                </div>
                            </div>
                            <a href={`/recipe/${recipe.id}`}>
                                <img src={recipe.image} alt={recipe.title} />
                            </a>
                        </Card>
                    )
                })}
            </Grid>
        </div>
    )
}
const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 0.65fr));
    grid-gap: 3rem;
`;
const Card = styled.div`
    position: relative;
    img {
        width: 100%;
        border-radius: 1.6rem;
        padding: 0;
    }
    a {
        text-decoration: none;
    }
    h4 {
        postion: block;
        font-size: 1.2em;
        text-align: center;
        vertical-align: middle;
        padding: 1.2rem 0 0;
        margin: 0;
    }
    container = {
        position: relative;
        transition: transform 0.2s;
        &:hover{
            cursor: pointer;
            transform: scale(1.1);
    }
    container:hover .overlay{
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

export default Searched;
