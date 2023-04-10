import React from 'react'
import { useParams } from "react-router-dom";



const Home = () => {
    const { id, lat, long } = useParams();
    return (
        <div style={{border:'10px solid black'}}>Home {id} {lat} {long}</div>
    )
}

export default Home