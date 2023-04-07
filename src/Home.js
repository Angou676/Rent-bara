import React from 'react'
import { useLocation } from 'react-router-dom'

const Home = () => {
    console.log(useLocation())
    return (
        <div>Home</div>
    )
}

export default Home