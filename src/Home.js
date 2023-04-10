import React from 'react'
import { useLocation } from 'react-router-dom'

const Home = () => {
    console.log(useLocation().pathname)
    return (
        <div>Home {useLocation().pathname}</div>
    )
}

export default Home