import React from 'react'
// import axios from “axios”;
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';

function Popular() {
    const URL = "https://api.spoonacular.com/recipes/";
    const [popular, setPopular] = useState([])
    useEffect(() => {
        getPopular();
    },[]);
    const getPopular = async () => {
        const checkPop = localStorage.getItem('popular');
        if (checkPop) {
            setPopular(JSON.parse(checkPop));
        } else {
            const api = await fetch(`${URL}/random?apiKey=${process.env.REACT_APP_API_Key}&number=18`)
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
                    type: 'loop',
                    perPage: 3,
                    pagination: false,
                    drag: 'free',
                    gap: '3rem',
                    rewind: true,
                }}>
                    {popular.map((recipe) => {
                        return(
                            <SplideSlide key={recipe.id}>
                                <Card>
                                    <Link to={`/recipe/${recipe.id}`}>
                                        <p>{recipe.title}</p>
                                        <img src={recipe.image} alt={recipe.title} />
                                        <Gradient />
                                    </Link>
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
        margin: 6rem 1rem;
        border-style: ridge;
    `;
    const Card = styled.div`
        min-height: 12rem;
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
            transform: translate(-50%, 0%);
            color: white;
            width: 100%;
            text-align: center;
            font-weight: 600;
            font-size: 1.25rem;
            height: 30%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    `;
    const Gradient = styled.div`
        z-index: 3;
        position: absolute;
        width: 100%;
        height: 125%;
        background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.4));
    `;
export default Popular;