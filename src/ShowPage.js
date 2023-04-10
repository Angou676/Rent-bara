import React from 'react'
import { useParams } from "react-router-dom";

const ShowPage = () => {
    const { id, lat, long } = useParams();
    return (
        <div>ShowPage here {id} {lat} {long}</div>
    )
}

export default ShowPage