import React from 'react';
import { useAuth } from '../UserContext';
import Hero from './Silder';
import FetchAllProducts from './FetchAllProducts'

export default function Home() {
    const { auth, setAuth } = useAuth();

    return (
        <div>
            <Hero/>
            <FetchAllProducts/>
        </div>
    );
}