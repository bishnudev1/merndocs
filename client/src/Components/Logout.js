import React, { useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../App';

const Logout = () => {

    const { state, dispatch } = useContext(UserContext)

    const navigate = useNavigate();

    useEffect(() => {
        fetch('/Logout', {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(() => {
            dispatch({ type: "USER", payload: false });
            navigate('/Login');
        }).catch((error) => console.log(error));
    })

    return (
        <>
            
        </>
    )
}

export default Logout