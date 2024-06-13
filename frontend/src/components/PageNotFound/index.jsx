import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const PageNotFound = () => {
    return (
        <div className='pagenotfound'>
            <h1 className='pagenotfound404'>404</h1>
            <h3>Page Not Found</h3>
            <button className='pagenotfoundbtn'>
                <Link to="/" style={{ textDecoration: 'none',color:'white' }}>
                    Go Back
                </Link>
            </button>
        </div>
    );
};

export default PageNotFound;
