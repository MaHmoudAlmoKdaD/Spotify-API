import { Link } from 'react-router-dom';
import './css/artists.css'
import React from 'react'

const Artist = ({dataOfArtists}) => {
  
    const dataOfArtist = dataOfArtists.artists.items.length > 0 && dataOfArtists.artists.items

    // set available Image that exists in API recieved
    const handleImage = (image) =>{
        if(image){
            if(image[0])
                return image[0].url
            else if(image[1])
                return image[1].url
            else if(image[2])
                return image[2].url
            else
                return "/images/unknown.jpg"
        }
    }

    // check the poplarity to set the color of stars
    const showStartsOfPopularity = (popularity) => {
        if(popularity <= 20){
            return <div style={{fontSize: "30px"}} className="d-flex ">                       
                <i className="yellow--color fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i> 
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i> 
                <i className="fa fa-star" aria-hidden="true"></i>
            </div>
        }
        else if( popularity > 20 && popularity <= 40){
            return <div style={{fontSize: "30px"}} className="d-flex ">                       
                <i className="yellow--color fa fa-star" aria-hidden="true"></i>
                <i className="yellow--color fa fa-star" aria-hidden="true"></i> 
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i> 
                <i className="fa fa-star" aria-hidden="true"></i>
            </div>  
        }
        else if( popularity > 40 && popularity <= 60){
            return <div style={{fontSize: "30px"}} className="d-flex ">                       
                <i className="yellow--color fa fa-star" aria-hidden="true"></i>
                <i className="yellow--color fa fa-star" aria-hidden="true"></i> 
                <i className="yellow--color fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i> 
                <i className="fa fa-star" aria-hidden="true"></i>
            </div>  
        }
        else if( popularity > 60 && popularity <= 80){
            return <div style={{fontSize: "30px"}} className="d-flex ">                       
                <i className="yellow--color fa fa-star" aria-hidden="true"></i>
                <i className="yellow--color fa fa-star" aria-hidden="true"></i> 
                <i className="yellow--color fa fa-star" aria-hidden="true"></i>
                <i className="yellow--color fa fa-star" aria-hidden="true"></i> 
                <i className="fa fa-star" aria-hidden="true"></i>
            </div> 
        }
        else if( popularity > 80 && popularity <= 100){
            return <div style={{fontSize: "30px"}} className="d-flex ">                       
                <i className="yellow--color fa fa-star" aria-hidden="true"></i>
                <i className="yellow--color fa fa-star" aria-hidden="true"></i> 
                <i className="yellow--color fa fa-star" aria-hidden="true"></i>
                <i className="yellow--color fa fa-star" aria-hidden="true"></i> 
                <i className="yellow--color fa fa-star" aria-hidden="true"></i>
            </div>
        }
    }

    return (      
        dataOfArtist &&
        dataOfArtist.map(artist => {
        return <div key={artist.id} 
                    className='col-lg-3 col-sm-6 col-md-4 mt-2'
                    style={{height: "450px"}}>
                    <div className="card border" >
                        <div className="card-header cursor text-center" >
                            <Link to={`/albums/${artist.id}`}>
                                <img 
                                    style={{maxWidth : "80%", maxHeight : "300px"}} 
                                    src={handleImage(artist.images)} 
                                    alt='Sorry no image available for this artist' 
                                />
                            </Link>
                        </div>
                        <div className="card-body">
                            <h5>{artist.name}</h5>
                            <h5 style={{color: 'orange'}}>{artist.followers.total} Followers</h5>
                            {showStartsOfPopularity(artist.popularity)}
                        </div>
                    </div>

                    
                </div>   
        })
    );
};

export default Artist;