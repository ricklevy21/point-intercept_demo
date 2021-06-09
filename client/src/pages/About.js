//dependencies
import React from 'react'


const About = () => {
    return (
        <>
        <p>
            <i><strong>point-intercept</strong></i> is a field-to-database application deisnged to use the line-point-intercept method for measuring ecological characteristics of a habitat.
            <br/>
            <br/>
            The line-point-intercept method is commonly used to rapidly and accurately quantify vegetation and ground cover (<a href="https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5172121.pdf">Herrick et al 2005</a>). A field ecologist lays a measuring tape of a designated length, or “transect”, at the site of interest and walks the line while stopping at incremented “points” to record data. Typically, a characterization of the soil surface is made and the species of plant intercepting a pin flag are recorded. Additional data can be incorporated depending on the researchers’ question, for example tree canopy cover, soil moisture, or shrub density.
            This application relies on three tiers of data: project, transect, and point. Point data belong to their parent transect and transect data belong to their parent project. Create a project to begin. In the field, the user can add a transect and record data at points along the transect. The point data collection form is set to increment by 0.25, allowing the field crew to take measurements every quarter meter. When the end of the transect has been reached, the user can enter the final point’s data and select “end transect”.
            <br/>
            <br/>
            This application has been developed to allow for offline data colleciton, however a project must be created while connected to the internet. Once the user returns to a stable internet connection they must <a href="/sync">sync</a> their data. 
            <br/>
            <br/>
            A complete dataset for a project can be downloaded as a CSV file.
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            developed by <a href = "https://www.botanicgardens.org/team/profile/rick-levy">Rick Levy / Database Associate / Research & Conservation / Denver Botanic Gardens</a>
        </p>
        </>
    )
}

export default About