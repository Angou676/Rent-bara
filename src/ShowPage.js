import React from 'react'
import { useLocation } from 'react-router-dom'

const ShowPage = () => {
    return (
        <div>ShowPage here {useLocation().pathname}</div>
    )
}

export default ShowPage