import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Searched from './Searched';
import Recipe from './Recipe';

function Pages() {
    return (
        <Routes>
            <Route path = "/" element={<Home />} />
            <Route path ="/searched/:input" element={<Searched />} />
            <Route path ="/recipe/:id" element={<Recipe />} />
        </Routes>
    );
}
export default Pages;