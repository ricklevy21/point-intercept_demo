//dependencies
import React, { useEffect, useState } from "react";
import API from "../utils/API";
import ProjectTable from '../components/Project/ProjectTable'
import { withAuthenticationRequired } from "@auth0/auth0-react";


const Projects = () => {

        //Setting component's initial state
        const [projects, setProjects] = useState()

        //Load all of the projects and store them with setProjects
        useEffect(() => {
            loadProjects()
        }, [])
        
        //Loads all projects and sets them to projects
        function loadProjects(){
            //get projects from mongo db database (and send them to indexedDB) if there is a network connection
            if (navigator.onLine){
                API.getProjects()
                    .then(res => {
                        //set state for page display
                        setProjects(res.data)
                        //send the project data to the indexedDB database so it can be accesses when offline
                        const request = window.indexedDB.open("point-intercept", 1);
                        request.onsuccess = () => {
                            const db = request.result
                            const transaction = db.transaction(["projects"], "readwrite")
                            const projectsStore = transaction.objectStore("projects")        
                            const projectData = res.data
                            projectData.map(projectDatum => projectsStore.put({ _id: projectDatum._id, project: projectDatum.project, transects: projectDatum.transects}))
                        }
                    })
                    .catch(err => console.log(err))
            //get projects from indexedDB database if there is no network conneciton
            } else {
                //method for pulling project name from indexedDB
                const request = window.indexedDB.open("point-intercept", 1);
                //get the project name from the indexedDB database, based on the "_id" in the params
                request.onsuccess = () => {
                    const db = request.result
                    const transaction = db.transaction(["projects"], "readwrite")
                    const projectsStore = transaction.objectStore("projects")
                    const getAllRequest = projectsStore.getAll()
                    getAllRequest.onsuccess = () => {
                        console.log(getAllRequest.result);
                        const project = getAllRequest.result
                        setProjects(project)
                      };                     
                }
            }
        }

    return (
        <>
        <div className="row">
            <div className="col s12">
                <h1>projects</h1>
                </div>
        </div>
        <div className="row">
            <div className="col s12">
                {projects ?
                <ProjectTable
                projects={projects}
                /> 
                : ""}
            </div>
        </div>
        </>
    )
}

export default withAuthenticationRequired(Projects)