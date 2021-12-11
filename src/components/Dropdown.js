import React from 'react';
import './css/dropdown.css'
const Dropdown = ({nameOfArtists, setSearchInputTextOnClickOnOptionFromDropdown}) => {

    // get artist from Search component and extract it from props 
    const nameOfArtist = nameOfArtists.artists.items.length > 0 && nameOfArtists.artists.items 

    return (
        nameOfArtist ?
            nameOfArtist.map(artist => {
                return  <div 
                            className="dataItem cursor "
                            key={artist.id}
                            onClick={ 
                                () => setSearchInputTextOnClickOnOptionFromDropdown(artist.name)   
                            }   
                        >
                            <p >{artist.name}</p>
                        </div>
            }) : 
            <div className="error"  >
                <p >There are no suggestions</p>
            </div>
        
            
    );
};

export default Dropdown;