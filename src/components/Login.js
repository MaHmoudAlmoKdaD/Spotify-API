import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import './css/login.css';
import App from '../App'
import Search from './Search';

// initial the variables for fetch data from API 
const CLIENT_ID = '17ca7eb52241428d892915f3ce859b33'
const SPOTITY_AUTHORIZE = 'https://accounts.spotify.com/authorize'
const REDIRECT_URL_AFTER_LOGIN = 'http://localhost:3000/callback'
const SPACES = '%20'
const SCOPES = [
            'user-read-playback-position',
            'user-read-playback-state'
        ]
const SCOPES_URL_PARAM = SCOPES.join(SPACES)


const Login = () => {
    const [login, setLogin] = useState(false)

    useEffect(() =>{      

        console.log("klasdfkjaskfdjkasjdfkjksadfj")
        
    })

    
    const handleLogin = () =>{
        window.location = `${SPOTITY_AUTHORIZE}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token`
        
        
    }
    return (
        
        <div className="container">
            <div className="container--btn">
                <button 
                    className="btn--login"
                    onClick={handleLogin}
                >
                    <p>Login</p>
                    <i className="fa fa-spotify spotfiy" aria-hidden="true"></i>
                </button>
            </div> 
        </div>
    );
};

export default Login;
