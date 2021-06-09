//dependencies
import React from 'react'
import { withAuthenticationRequired } from "@auth0/auth0-react";

//components
import AdditionalSpecies from '../components/AdditionalSpecies/AdditionalSpecies'

const AdditionalSpeciesPage = () => {
    return (
        <div className="row">
            <div className="col s12">
                <AdditionalSpecies/>
            </div>
        </div>
    )
}

export default withAuthenticationRequired(AdditionalSpeciesPage)