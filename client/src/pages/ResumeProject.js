//dependencies
import React from 'react'
import AddTransect from '../components/AddTransect/AddTransect'
import { withAuthenticationRequired } from "@auth0/auth0-react";


const ResumeProject = () => {
    return (
            <>
            <AddTransect />
            </>
    )
}

export default withAuthenticationRequired(ResumeProject)