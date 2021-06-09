//dependencies
import React from 'react'
import SyncBtn from '../components/Sync/SyncBtn'
import { withAuthenticationRequired } from "@auth0/auth0-react";


const Sync = () => {

    return (
        <>
        <h6>Data recorded while offline is cached in the browser. Once back online with a stable connection, click the button below to send data to the databse and clear the browser's cache.</h6>
        <br></br>
        <SyncBtn />
        </>
    )
}

export default withAuthenticationRequired(Sync)