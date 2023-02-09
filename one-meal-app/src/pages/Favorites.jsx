import React from 'react'
import axios from "axios";
// import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import styled from 'styled-components';

function Favorites() {
    console.log("Favorites page is called")
    const [Favorites, setFavorites] = useState([]);

    const getFaves = () => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/favorites`)
            .then((response) => {
                console.log(response);
                const favesAPIResCopy = response.data.map((fave) => {
                return {
                    ...fave,
                };
            });
            setFavorites(favesAPIResCopy);
        })
            .catch((error) => {
                console.log(error);
            });
        }
    };
    useEffect(getFaves, []);

    return (
        <div>
            <h2>Your Favorites</h2>
            <Grid>
                {Favorites.map((recipe) => {
                    return(
                        <Card key={recipe.id}>
                            <div className='overlay'>
                                <h4>{recipe.title}</h4>
                            </div>
                            <a href={`/recipe/${recipe.id}`}>
                                <div className='container'>
                                    <img src={recipe.image} alt={recipe.title} />
                                    <div className='overlay'></div>
                                </div>
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

export default Favorites;
