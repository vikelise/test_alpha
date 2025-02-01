import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/NotFound.css"


const NotFound : React.FC = ()=>{
    return (
            <div className="not-found-container">
                <img src={require('../images/error404.jpg')} alt="error" className="not-found-img"/>
                <h1>Error: 404 not found</h1>
                <p>
                    <b>
                        Try to return to the <Link to="/" className="not-found-link">home</Link> page
                    </b>
                </p>
            </div>
    )
};

export default NotFound;