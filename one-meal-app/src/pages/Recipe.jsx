import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Recipe() {
    console.log("single recipe page is called")
    const URL = "https://api.spoonacular.com/recipes/";

    const params = useParams();
    const [recipe, setRecipe] = useState({});

    const getRecipe = async () => {
        const api = await fetch(`${URL}${params.id}/information?apiKey=88cbb41354b04d13858d7f377e338113`)
        const res = await api.json();
        console.log(res);
        setRecipe(res);
    };

    useEffect(() => {
        getRecipe();
    }, [params.id]);
    
    return (
        <RecipeWrapper>
            <div>
                <h2>{recipe.title}</h2>
                <img src={recipe.image} alt={recipe.title} />
            </div>
            <Info>
                <Button>Ingredients</Button>
                <Button>Instructions</Button>
            </Info>
        </RecipeWrapper>
    );
}

const RecipeWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    .active{
        background-color: linear-gradient(35deg, #FFC0B9, #FF8474);
        color: #FFF7EE;
    }
    h2{
        margin-bottom: 2rem;
    }
    li{
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul{
        margin-top: 2rem;
    }
`
const Button = styled.div`
    padding: 1rem 2rem;
    color: #A3A0CB;
    background: #FFF7EE;
    border: 2px solid #FF8474;
    margin-right: 2rem;
    font-weight: 600;
`
const Info = styled.div`
    display: flex;
    margin-left: 10rem;
`;

export default Recipe;