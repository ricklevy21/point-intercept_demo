//dependencies
import React from 'react'
import EditProjectData from '../components/EditData/EditData'
import { withAuthenticationRequired } from "@auth0/auth0-react";


const Edit = () => {
    return (
        <>
            <div className="row">
                <div className="col s12">
                    <EditProjectData/>
                </div>
            </div>
        </>
    )
}

export default withAuthenticationRequired(Edit)