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
        // const checkSearched = localStorage.getItem('searched');
        // if (checkSearched) {
        //     setSearchedFood(JSON.parse(checkSearched));
        // } else {
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=b7a6c9d38b904685a82e32c6e9ebc999&query=${keyword}&number=20`)
        const res = await api.json();
        setSearchedFood(res.results);
        console.log(`res.results: ${res.results}`);
    };
// };
    useEffect(() => {
        getResult(params.input);
    }, [params.input]);

    console.log(searchedFood);
    localStorage.setItem('searched', JSON.stringify(searchedFood))

    return (
        <div>
            <Title>Recommended Recipes</Title>
            <div className='searched'>
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
        </div>
    )
}
const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 0.65fr));
    grid-gap: 3rem;
    margin-left: 0;
    padding-left: 0;
`;
const Title = styled.h2`
    display: inline-block;
`
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
        postion: inline-block;
        font-size: 1.1em;
        line-height: 1.2em;
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
