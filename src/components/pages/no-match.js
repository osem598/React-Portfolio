import React from 'react';
import { Link } from 'react-router-dom';

export default function(){
    return(
        <h2>
            We Couldn't find that page
            <Link to="/">Return to Homepage</Link>
        </h2>
    )
    
}