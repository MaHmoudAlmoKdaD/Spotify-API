import React from 'react';
import './css/error.css'
const Error = (props) => {
    return (
        <div className="error">
               <p>{props.error}</p>
           </div>
    );
};
export default Error