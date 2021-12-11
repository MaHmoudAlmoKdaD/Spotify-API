import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';  
import Error from './Error'
const Albums = (props) => {

    const CURRENT_URL = window.location.pathname  
    const [space, path, id] = CURRENT_URL.split('/')

    const [albums, setAlbums]    = useState(null)
    const [loading, setLoading]  = useState(true)
    
    useEffect(()=>{
        const TOKEN = localStorage.getItem("accessToken")
        axios.get(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=single%2Cappears_on&market=ES&limit=10&offset=5`,{
            headers: {
                'Authorization': 'Bearer ' + TOKEN
            }
        }).then(res => {
            setAlbums(res)
            setLoading(false)
        }).catch(error => {
            console.log(error);
        })
            
    },[])

    // set available Image that exists in API
    const handleImage = (image) =>{
        if(image){
            if(image[0])
                return image[0].url
            else if(image[1])
                return image[1].url
            else if(image[2])
                return image[2].url
            else
                return
        } 
    }

    return (     
        <div>
            <div className="text-center">
                <h3 
                    style={{height : '80px'}} 
                    className="p-4 border bg-primary text-light text-center"
                >
                    Spotify Artists Search
                </h3>
            </div>
            <div className="text-center mt-2"> <h1>Albums</h1> </div>
            {/* if loading or does not have albums return nothing class Name otherwise , row class */}
            <div className={ loading || albums.data.items.length === 0 ?  null : "row"} >
                { loading ? <div className='text-center text-success'>Loading ...</div> : 
                // if does not have albums return Error componet otherwise show the Albums
                    albums.data.items.length !== 0 ?
                    albums.data.items.map((album, key) =>{
                        return <div 
                            className='col-lg-3 col-md-4 col-sm-6 mt-2'
                            key={key}
                            style={{height: "450px"}}
                            >
                            <div className="border" >
                                <div className="card-header text-center" >
                                    <img 
                                        style={{maxWidth : "90%"}} 
                                        src={handleImage(album.images)} 
                                        alt='Sorry no image available for this album' 
                                    />
                                </div>
                                <div className="card-body">
                                    <h4>{album.name}</h4>
                                    <h5 style={{color: 'orange'}}>{album.nameArtist}</h5>
                                    <p className="text-secondary">{album.release_date}</p>  
                                    <p className="text-secondary">{album.total_tracks} Tracks</p>  
                                </div>
                            </div> 
                        </div> 
                }) :<div className='text-center'><Error error={'No Albums'} /></div> }
            </div>  
        </div>
    );
};

export default Albums;