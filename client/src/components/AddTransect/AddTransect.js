//dependencies
import { GPSbtn } from "./GPSbtn"
import { Input, SubmitBtn } from "../../components/Form";
import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import {useHistory, useParams } from 'react-router-dom'
import ResumeProjectName from './ResumeProjectName.js'
import cryptoRandomString from 'crypto-random-string'


const AddTransect = () => {

    //get _id param so that it can be passed to the add transect page
    const { _id } = useParams()

    const history = useHistory()

    //setting component's initial state
    //hook for state where project title is displayed
    const [project, setProject] =useState([])
    //hook for state of transect info form
    const [transectFormObject, setTransectFormObject] = useState({
        transect: "",
        latitude: "",
        longitude: "",
        elevation: "",
        date: "",
        crew: "",
    })

    //display the project title once the component mounts
    useEffect(() => {
        if (navigator.onLine){
            //GET Method for pulling project name from mongoDB
            API.getProjectByID(_id)
            .then(res => {
                setProject(res.data)
            })
            .catch(err => console.log(err))
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }
        else {
            //method for pulling project name from indexedDB
            const request = window.indexedDB.open("point-intercept", 1);
            //get the project name from the indexedDB database, based on the "_id" in the params
            request.onsuccess = () => {
                const db = request.result
                const transaction = db.transaction(["projects"], "readwrite")
                const projectsStore = transaction.objectStore("projects")
                const getRequest = projectsStore.get(_id);
                getRequest.onsuccess = () => {
                  console.log(getRequest.result.project);
                  const project = getRequest.result
                  setProject(project)
                };      
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //handles updating component state when user types into the input field
    function handleInputChange(event){
        const { name, value } = event.target;
        setTransectFormObject({...transectFormObject, [name]: value})
    };

    //when the form is submitted, use API.addTransect method to save the project data
    //then navigate to the projects page and load all of the projects
    function handleTransectFormSubmit(event) {
        event.preventDefault()
        //send transect data to mongodb database, if online
        if (navigator.onLine){
            API.addTransect({
                transect: transectFormObject.transect,
                latitude: transectFormObject.latitude,
                longitude: transectFormObject.longitude,
                elevation: transectFormObject.elevation,
                date: transectFormObject.date,
                crew: transectFormObject.crew,
                projectID: _id //this is the project that I am adding the transect to
            })
            .then(res => {
                // destructure the response
                const { transects } = res.data
                //create variable transectID that is the last value from the res.data array (pop method)
                const transectId = transects.pop()
                //add the desired route that I want to naviagte to to the end of the history array, thus making it the current page
                history.push(`/record/${transectId}`)
            })
                .catch(err => console.log(err))
        //send transect data to indexedDB database, if offline
        } else {
            //open the point-intercept indexedDB database
            const request = window.indexedDB.open("point-intercept", 1);
            //send the transect form data to the indexedDB transectsStore object store
            request.onsuccess = () => {
               const db = request.result
               const transaction = db.transaction(["transects"], "readwrite")
               const transectsStore = transaction.objectStore("transects")
               const transectObject = {
                transect: transectFormObject.transect,
                latitude: transectFormObject.latitude,
                longitude: transectFormObject.longitude,
                elevation: transectFormObject.elevation,
                date: transectFormObject.date,
                crew: transectFormObject.crew,
                projectID: _id,
                _id: cryptoRandomString({length: 24})
               }
               console.log(transectObject)
               transectsStore.add(transectObject)
               history.push(`/record/${transectObject._id}`)
            }
        }
        
    };

    return (
        <>
        <ResumeProjectName
            id={project._id}
            project={project.project}
            />
        <form>
            <div className="form-group">
                <label>transect name</label>
                <Input name="transect" id="transect" className="form-control" onChange={handleInputChange}></Input>
            </div>



            <div className="form-group">
                <div className="row">
                    <div className="col-5">
                        <Input id="latitude" name="latitude" value={transectFormObject.latitude} className="form-control" placeholder="latitude" onChange={handleInputChange}></Input>
                    </div>
                    <div className="col-5">
                        <Input id="longitude" name="longitude" value={transectFormObject.longitude}  className="form-control" placeholder="longitude" onChange={handleInputChange}></Input>
                    </div>
                    <div className="col-2">
                        <GPSbtn
                            setGPS={setTransectFormObject}
                            stateGPS={transectFormObject}
                        />
                    </div>
                </div>
            </div>



            <div className="form-group">
                <label>elevation (m)</label>
                <Input id="elevation" name="elevation" className="form-control" type="number" min="0" onChange={handleInputChange}></Input>
            </div>
            <div className="form-group">
                <label>date</label>
                <Input id="date" name="date" className="form-control" type="date" onChange={handleInputChange}></Input>
            </div>
            <div className="form-group">
                <label>crew</label>
                <Input id="crew" name="crew" className="form-control" onChange={handleInputChange}></Input>

            </div>
                <SubmitBtn
                    onClick={handleTransectFormSubmit}
                    >start
                </SubmitBtn>
        </form>
        </>
    )
}

export default AddTransect