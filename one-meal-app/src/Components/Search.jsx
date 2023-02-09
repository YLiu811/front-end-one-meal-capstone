import styled from 'styled-components';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


function Search() {
    const [input, setInput] = useState("")
    const navigate = useNavigate();

    const submitForm = (e) => {
    e.preventDefault();
    navigate(`/searched/${input}`);
    };
    console.log('search bar is working');

    return (
        <FormStyle onSubmit={submitForm}>
            <div>
                <FaSearch></FaSearch>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
            </div>
        </FormStyle>
    )
};

const FormStyle = styled.form`
    margin: 4rem 4rem 4rem 0;
    div {
        width: 100%;
        margin-left: 0;
        // padding-left: 1rem;
        position: relative;
    }
    
    input {
        width: 100%;
        border: none;
        background: linear-gradient(-35deg, #FFC0B9, #FF8474);
        font-size: 1.6rem;
        color: #36474F;
        padding: 1rem 3rem;
        border: none;
        border-radius: 0.8rem;
        outline: none;
    }
    svg {
        position: absolute;
        top: 26%;
        left: 2%;
        transform: translate(100%, -50%)
        color: #F0F7EF;
    }
`

export default Search;