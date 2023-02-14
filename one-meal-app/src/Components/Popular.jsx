import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import Favorite from './Favorite';

function Popular() {
    // const URL = "https://api.spoonacular.com/recipes/random?";
    const [popular, setPopular] = useState([])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getPopular = async () => {
        const checkPop = localStorage.getItem('popular');
        if (checkPop) {
            setPopular(JSON.parse(checkPop));
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=51d0e725a5f9407891c4892e29d1c70a&number=24`)
            const res = await api.json();
            localStorage.setItem('popular', JSON.stringify(res.recipes))
            setPopular(res.recipes);
            console.log(`res.recipes: ${res.recipes}`);
        }
        console.log(`popular: ${popular}`);
    };
    useEffect(() => {
        getPopular();
    },[getPopular]);


    return (
        <div>
            <Wrapper>
                <h2>Editor's Popular Pick</h2>
                <Splide options={{
                    type: 'loop',
                    perPage: 3,
                    pagination: false,
                    drag: 'free',
                    gap: '3rem',
                    rewind: true,
                }}>
                    {popular?.map((recipe) => {
                        return(
                            <SplideSlide key={recipe.id}>
                                <Card>
                                    <Favorite recipe={recipe}/>
                                        <Link to={`/recipe/${recipe.id}`}>
                                        <p>{recipe.title}</p>
                                        <img src={recipe.image} alt={recipe.title} />
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
        padding: 1.2rem;
        border-style: ridge;
    `;

    const Card = styled.div`
        min-height: 20rem;
        border-radius: 2rem;
        overflow: hidden;
        position: relative;
        padding: 1rem;
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
            bottom: 10%;
            transform: translate(-50%, 0%);
            color: #36474F;
            width: 100%;
            text-align: center;
            font-weight: 600;
            font-size: 1.15rem;
            height: 20%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        img-container = {
            position: relative;
            justify-content: start;
            transition: transform 0.2s;
            &:hover{
                cursor: pointer;
                transform: scale(1.1);
        }
        img-container:hover .overlay{
            opacity: 1;
        }
    `;

export default Popular;
