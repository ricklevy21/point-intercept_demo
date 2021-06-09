//dependencies
import React from 'react'
import { withAuthenticationRequired } from "@auth0/auth0-react";


//components
import RecordData from '../components/RecordData/RecordData'

const RecordPage = () => {
    return (
        <>
        <RecordData/>
        </> 
    )
}

export default withAuthenticationRequired(RecordPage)