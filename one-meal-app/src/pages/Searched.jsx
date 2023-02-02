import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
function Searched() {
    const [searchedFood, setSearchedFood] = useState([]);
    const params = useParams();
    const getResult = async (query) => {
        const checkRecipe = localStorage.getItem('searchedFood');
        if (checkRecipe) {
            setSearchedFood(JSON.parse(checkRecipe));
        } else {
            const api = await fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=b7a6c9d38b904685a82e32c6e9ebc999')
            const res = await api.json();
            localStorage.setItem('searchedFood', JSON.stringify(res.recipes))
            setSearchedFood(res.recipes);
            console.log(res.recipes)
        }
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
                                <img src={recipe.image} alt={recipe.title} />
                                <h4>{recipe.title}</h4>
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
    grid-template-columns: repeat(autofit, minmax(20rem, 1fr));
    gap: 2rem;
    margin-top: 2rem;
`;
const Card = styled.div`
    position: relative;
    img {
        width: 100%;
        height: 100%;
        border-radius: 1rem;
    }
    a {
        text-decoration: none;
    }
    h4 {
        text-align: center;
        padding: 1rem 0;
    }
`;
export default Searched;