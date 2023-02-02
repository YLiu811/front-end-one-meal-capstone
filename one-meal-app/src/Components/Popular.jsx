import React from 'react'
// import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/react-splide/css';

function Popular() {
    // const URL = "https://api.spoonacular.com/recipes/random?";
    const [popular, setPopular] = useState([])
    useEffect(() => {
        getPopular();
    },[]);

    // const axios = require('axios');
    // const getPopular = () => {
    //     axios
    //     // .get(`${URL}apiKey=${process.env.API_KEY}&number=6`)
    //     .get('https://api.spoonacular.com/recipes/random?apiKey=b7a6c9d38b904685a82e32c6e9ebc999&number=6')
    //     .then((res) => {
    //         console.log(res);
    //         setPopular(res.recipes);
    // })
    //     .catch((err) => {
    //     console.log(err);
    // });
    // };
    const getPopular = async () => {
        const checkPop = localStorage.getItem('popular');
        if (checkPop) {
            setPopular(JSON.parse(checkPop));
        } else {
            const api = await fetch('https://api.spoonacular.com/recipes/random?apiKey=b7a6c9d38b904685a82e32c6e9ebc999&number=6')
            const res = await api.json();
            localStorage.setItem('popular', JSON.stringify(res.recipes))
            setPopular(res.recipes);
            console.log(res.recipes)
        }
    };

    return (
        <div>
            <Wrapper>
                <h3>Editor's Popular Pick</h3>
                <Splide options={{
                    perPage: 3,
                    pagination: false,
                    // drag: 'free',
                    gap: '6rem',
                }}>
                    {popular.map((recipe) => {
                        return(
                            <SplideSlide key={recipe.id}>
                                <Card>
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt={recipe.title} />
                                    <Gradient />   
                                </Card>
                            </SplideSlide>
                        );
                    })}
                </Splide>
            </Wrapper>
        </div>
    );
};
    const Wrapper = styled.div`
        margin: 4rem 0rem;
    `;

    const Card = styled.div`
        min-height: 25rem;
        border-radius: 2rem;
        overflow: hidden;
        position: relative;

        img{
            border-radius: 2rem;
            position: absolute;
            left: 0;
            width: 100%;
            height: 100%
            object-fit: cover;
        }
        p{
            position: absolute;
            z-index: 10;
            left: 50%;
            bottom: 0%;
            transform: trasnlate(-50%, 0%);
            color: white;
            width: 100%;
            text-align: center;
            font-weight: 600;
            font-size: 1.25rem;
            height: 40%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    `;
    const Gradient = styled.div`
        z-index: 3;
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.4));
    `;


export default Popular;
