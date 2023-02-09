import React from 'react'
import Popular from "../Components/Popular";
import Search from '../Components/Search';

function Home() {
    return (
        <div>
            <h1>One Meal</h1>
            <h2>Your one stop shop to a great meal</h2>
            <Search />
            <Popular />
        </div>
    )
}

export default Home;