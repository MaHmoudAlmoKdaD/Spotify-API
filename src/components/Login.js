import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import './css/login.css';
import App from '../App'

// initial the variables for fetch data from API 
const CLIENT_ID = '00aa100801fc426dbade0911ef2fa3f3'
const SPOTITY_AUTHORIZE = 'https://accounts.spotify.com/authorize'
const REDIRECT_URL_AFTER_LOGIN = 'http://localhost:3000/callback'
const SPACES = '%20'
const SCOPES = [
            'user-read-playback-position',
            'user-read-playback-state'
        ]
const SCOPES_URL_PARAM = SCOPES.join(SPACES)

// split token from URL and get token to add it to header in axios 
const getReturnedParamsFromSpotifyAuth = (hash) =>{
    const stringAfterHashing = hash.substring(1);
    const paramsInUrl = stringAfterHashing.split("&");
    const paramsSplitUP = paramsInUrl.reduce((accumulater, currnetValue) => {
        const [key, value] = currnetValue.split('=');
        accumulater[key] = value;
        return accumulater;
    }, {});
    return paramsSplitUP;
}

const Login = () => {
    const [login, setLogin] = useState(false)

    useEffect(() =>{
        
        if(window.location.hash){
            const {
                access_token,
                expires_in,
                token_type,
            } = getReturnedParamsFromSpotifyAuth(window.location.hash);
        
            localStorage.clear();
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("expiresIn", expires_in);
            localStorage.setItem("tokenType", token_type)
            handleSetLogin()
        }
    })
    const handleSetLogin  = () => {
        setLogin(true)
    }
    const handleLogin = () =>{
        window.location = `${SPOTITY_AUTHORIZE}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token`
        
        
    }
    return (
        login ? <App isAuth={true}/> :
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
