import React, {useEffect, useReducer, useState} from 'react'
import axios from 'axios'
import './css/search.css'
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import Dropdown from './Dropdown';
import Artists from './Artists';

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


const initialState = {
    artists: {},
    error : ''
}

const reducer = (state, action) => {
    switch(action.type){
        case 'FETCH_SUCCESS':
            return {
                
                artists: action.payload,
                error: ''
            }
        case 'FETCH_ERROR':
            return {
                artists: {},
                error: 'Something Went Wrong'
            }    
        default:
            return state
    }
} 
const Search = () => {
    const [search, setSearch] = useState('')
    const [searchIcon, setSearchIcon] = useState(true)
    const [state, dispatch] = useReducer(reducer, initialState)

    // to fetch data when search state changed 
    useEffect(() => {
        const TOKEN = localStorage.getItem("accessToken")
        if(search){
            axios.get(`https://api.spotify.com/v1/search?q=${search}&type=artist&market=ES&limit=50&offset=0`,{
                headers: {
                    'Authorization': 'Bearer ' + TOKEN
                }
            }).then(response => {
                dispatch({type: 'FETCH_SUCCESS', payload: response.data})
                setSearchIcon(false)
                // console.log(response.data)
                showDropdown()
                
            }).catch(error => {
                console.log("error",error);
                dispatch({type: 'FETCH_ERROR'})
                
            })
    }}, [search])
    // to set localStorage Items with data of access token , expires in, token type
    useEffect(() => {
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
            
        }
        
    }, [])
    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const clearDropdown = () => {
        if( state.artists )
            document.getElementById('dropdown').style.display = 'none'
        setSearchIcon(true)
    }

    const showDropdown = () => {
        document.getElementById('dropdown').style.display = 'block'
        setSearchIcon(false)
    }

    const setSearchInputTextOnClickOnOptionFromDropdown = (name) => {
        setSearch(name)
        clearDropdown()
        // to fill the value of input field based what the user choosed from Dropdown options 
        const inputField = document.querySelector('#inputSearch')
        inputField.value = name
    }
    return (
        <div>
            <div className="text-center">
                <h3 className="p-4 border bg-primary text-light text-center on-maxwidth-smallerthan-600">
                    Spotify Artists Search 
                </h3>
            </div>
            <div className="search">
                <div className="searchInputs">
                    <input  id="inputSearch"
                            type="text"
                            placeholder="Search for an artist..."
                            onChange={handleChange}
                    />
                    <div className="searchIcon">
                        {searchIcon ? ( 
                            <AiOutlineSearch />
                        ) : (
                            <AiOutlineClose 
                                id="clearBtn"  
                                onClick={() => {
                                    clearDropdown()
                                    
                                    }
                                }
                            />
                        )}
                    </div>
                </div>
            </div>

            {/*
             DROPDOWN
             to show dropdown box if search state is not empty  
            */}
            {   
                search && <div className="dataResult" id="dropdown">

                    {/* if artists state is no empty show dropdown items */}
                    {
                        state.artists.artists ?
                        <Dropdown 
                            nameOfArtists={state.artists} 
                            setSearchInputTextOnClickOnOptionFromDropdown={setSearchInputTextOnClickOnOptionFromDropdown}
                        /> :
                        null
                    }
                </div>
            }


            <div className= "row artists" > 
            { 
                state.artists.artists ?
                <Artists dataOfArtists={state.artists} /> :
                null
            }
            </div>
            
        </div>

    )
}

export default Search
