import React from "react";
import { ProjectListItem } from "./ProjectListItem"

const ProjectTable = ({projects}) => {

    return (
        <table className="table">
            <tbody>
                   <ProjectListItem
                    projects={projects}
                    />
            </tbody>
        </table>
    )
}

export default ProjectTable