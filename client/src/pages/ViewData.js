//dependencies
import React from 'react'
import GetData from '../components/GetData/GetData'
import { withAuthenticationRequired } from "@auth0/auth0-react";


const ViewData = () => {
    return (
        <>
        <GetData />
        </>
    )
}

export default withAuthenticationRequired(ViewData)