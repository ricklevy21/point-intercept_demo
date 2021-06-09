import React, { useState } from "react";
import API from "../../utils/API";
import { Input, SubmitBtn } from "../../components/Form";
import {useHistory } from 'react-router-dom'
import cryptoRandomString from 'crypto-random-string'

//for alert
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const CreateNew = () => {

    //alert state
    const [open, setOpen] = React.useState(false);
    //close alert
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        };

    const history = useHistory()

    //setting component's initial state
    // const [projects, setProjects] = useState([])
    const [projectFormObject, setProjectFormObject] = useState({
        project: ""
    })

    //handles updating component state when use types into the input field
    function handleInputChange(event){
        const { name, value } = event.target;
        setProjectFormObject({...projectFormObject, [name]: value})
    };

    //when the form is submitted, use API.addProject method to save the project data
    //then navigate to the projects page and load all of the projects
    function handleProjectFormSubmit(event) {
        event.preventDefault()
            if (navigator.onLine){
                API.addProject({
                    project: projectFormObject.project
                })
                    .then(() => setProjectFormObject({
                        project: ""
                    }))
                    .then(window.location.href='/projects')
                    .catch(err => console.log(err))
            } else {
                //CODE TO CREATE PROJECT OFFLINE (Creates issue where transects are not linked to projects, so for now disabling.)
                //open the point-intercept indexedDB database
                // const request = window.indexedDB.open("point-intercept", 1);
                // //send the transect form data to the indexedDB transectsStore object store
                // request.onsuccess = () => {
                // const db = request.result
                // const transaction = db.transaction(["projects"], "readwrite")
                // const projectsStore = transaction.objectStore("projects")
                // const projectObject = {
                //     project: projectFormObject.project,
                //     _id: cryptoRandomString({length: 24})
                // }
                // console.log(projectObject)
                // projectsStore.add(projectObject)
                // history.push('/projects')
                setOpen(true)
            }
    };

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <label>project name</label>
                        <Input
                        onChange={handleInputChange}
                        name="project"
                        type="text"
                        className="form-control"
                        id="project"
                        required
                        value={projectFormObject.project}
                        />
                    </div>
                </div>
            </div>
            <SubmitBtn
            type="button"
            className="btn btn-dark btn-lg btn-block"
            onClick={handleProjectFormSubmit}
            >create project</SubmitBtn>
                    <div>
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="PROJECT CREATION FAILED! you must be connected to the internet to preform this operation!"
                action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
                }
            />
        </div>
        </>
    )
}

export default CreateNew