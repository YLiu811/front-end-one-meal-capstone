import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function Searched() {
    console.log("searched page is called")
    const [searchedFood, setSearchedFood] = useState([]);
    const params = useParams();
    const getResult = async (keyword) => {
        const checkRecipe = localStorage.getItem('searchedFood');
        console.log(checkRecipe);
        // if (checkRecipe) {
        //     setSearchedFood(JSON.parse(checkRecipe));
        // } else {
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=88cbb41354b04d13858d7f377e338113&query=${keyword}&number=18`)
        const res = await api.json();
            // localStorage.setItem('searchedFood', JSON.stringify(res.recipes))
        setSearchedFood(res.results);
        console.log(res.results)
    };
    
    useEffect(() => {
        getResult(params.input);
    }, [params.input]);
    
    return (
        <div>
            <h3>Recommended Recipes</h3>
            <Grid>
                {searchedFood.map((recipe) => {
                    return(
                        <Card key={recipe.id}>
                            <a href={`/recipe/${recipe.id}`}>
                                <h4>{recipe.title}</h4>
                                <img src={recipe.image} alt={recipe.title} />
                            </a>
                        </Card>
                    )
                })};
            </Grid>
        </div>
    )
}
const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(autofit, minmax(14rem, 0.65fr));
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
        position: block;
        font-size: 1.5rem;
        text-align: center;
        padding: 1rem 0;
        vertical-align: middle;
        padding: 1.2rem 0 0;
        margin: 0;
    }
`;
export default Searched;