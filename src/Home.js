import React from 'react'
import { useParams } from "react-router-dom";



const Home = () => {
    const { id, lat, long } = useParams();
    return (
        <div>Home {id} {lat} {long}</div>
    )
}

export default Home