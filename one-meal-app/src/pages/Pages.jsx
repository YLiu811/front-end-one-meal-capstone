import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Searched from './Searched';
import Recipe from './Recipe';
import Favorites from './Favorites';

function Pages() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/searched/:input" element={<Searched />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="/favorites" element={<Favorites />} />
        </Routes>
    );
}

export default Pages;
