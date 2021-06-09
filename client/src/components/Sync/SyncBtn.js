import React from "react";
import API from "../../utils/API";
import mongoose from "mongoose"
import {useHistory } from 'react-router-dom'


//for alert
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const SyncBtn = () => {

    const history = useHistory()

    //alert state
    const [open, setOpen] = React.useState(false);
    //close alert
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        };

    //function to send data from indexedDB to API for uplaod to mongodb database, then clear indexedDB
    function handleSync(event) {
        event.preventDefault()
        //if there is an internet connection, proceed with submitting data
        if (navigator.onLine){
            //open indexedDB
        const request = window.indexedDB.open("point-intercept", 1);
            //get the project name from the indexedDB database, based on the "_id" in the params
            request.onsuccess = () => {
                const db = request.result
                const transaction = db.transaction(["projects", "transects", "points"], "readwrite")
                const projectsStore = transaction.objectStore("projects")
                const transectsStore = transaction.objectStore("transects")
                const pointsStore = transaction.objectStore("points")
                const projectsRequest = projectsStore.getAll();
                const transectsRequest = transectsStore.getAll();
                const pointsRequest = pointsStore.getAll();
                //PROJECTS
                projectsRequest.onsuccess = () => {
                    //create object to hold project data from indexedDB that is not in mongo db
                    let missingProjects
                    //create object to hold project data from mongodb
                    let projectsFromDB
                    //get projects data from indexedDB and set to variable
                    const idbProjectsData = projectsRequest.result
                    //check if project is in database
                    API.getProjects()
                    .then(res => {
                        projectsFromDB = res.data
                        //grab projects from indexedDB that are not in mongo db and set to 'missingProjects'
                        let props = ['_id', 'project'];
                        missingProjects = idbProjectsData.filter(function(o1){
                            // filter out (!) items in result2
                            return !projectsFromDB.some(function(o2){
                                return o1._id === o2._id;          // assumes unique id
                            });
                        }).map(function(o){
                            // use reduce to make objects with only the required properties
                            // and map to apply this to the filtered array as a whole
                            return props.reduce(function(newo, project){
                                newo[project] = o[project];
                                return newo;
                            }, {});
                        });
                    })
                    .then(() => {
                        missingProjects.forEach(missingProject => {
                            API.addProject({
                                _id: mongoose.Types.ObjectId(missingProject._id),
                                project: missingProject.project
                            })
                            .catch(err => console.log(err))
                        })
                    }
                    )
                    .then(() => {
                        //CLEAR THE IDB PROJECTS STORE
                        const db = request.result
                        const transaction = db.transaction(["projects"], "readwrite")
                        const projectsStore = transaction.objectStore("projects")
                        const projectClearRequest = projectsStore.clear()
                        projectClearRequest.onsuccess = () => {
                            console.log("projects store cleared")
                        }
                    })
                };
                //TRANSECTS
                transectsRequest.onsuccess = () => {
                    const idbTransectsData = transectsRequest.result
                    idbTransectsData.forEach(idbTransect => {
                        API.addTransect({
                            _id: mongoose.Types.ObjectId(idbTransect._id),
                            transect: idbTransect.transect,
                            latitude: idbTransect.latitude,
                            longitude: idbTransect.longitude,
                            elevation: idbTransect.elevation,
                            date: idbTransect.date,
                            crew: idbTransect.crew,
                            additionalSpecies: idbTransect.additionalSpecies,
                            projectID: mongoose.Types.ObjectId(idbTransect.projectID) //this is the project that I am adding the transect to
                        })
                        .then(() => {
                            //CLEAR THE IDB TRANSECTS STORE
                            const db = request.result
                            const transaction = db.transaction(["transects"], "readwrite")
                            const transectsStore = transaction.objectStore("transects")
                            const transectClearRequest = transectsStore.clear()
                            transectClearRequest.onsuccess = () => {
                                console.log("transect store cleared")
                            }
                        })
                        .catch(err => console.log(err))
                    })
                };
                //POINTS
                pointsRequest.onsuccess = () => {
                    const idbPointsData = pointsRequest.result
                    idbPointsData.forEach(idbPoint => {
                        API.addPoint({
                            point: idbPoint.point,
                            ground_surface: idbPoint.ground_surface,
                            soil_moisture_percentage: idbPoint.soil_moisture_percentage,
                            shrub_density_detail: idbPoint.shrub_density_detail,
                            canopy_score: idbPoint.canopy_score,
                            canopy_taxa: idbPoint.canopy_taxa,
                            hit_one: idbPoint.hit_one,
                            hit_two: idbPoint.hit_two,
                            transectID: mongoose.Types.ObjectId(idbPoint.transectID), //this is the transect that I am adding the point to
                            _id: mongoose.Types.ObjectId(idbPoint._id)
                        })
                        .then(() => {
                            //CLEAR THE IDB POINTS STORE
                            const db = request.result
                            const transaction = db.transaction(["points"], "readwrite")
                            const pointsStore = transaction.objectStore("points")
                            const pointClearRequest = pointsStore.clear()
                            pointClearRequest.onsuccess = () => {
                                console.log("points store cleared")
                            }
                        })
                        .then(() => {
                            history.push('/projects')
                        })
                        .catch(err => console.log(err))
                    })
                }; 
            }

        //if there is no internet connection, send an alert and do nothing
        } else {
            setOpen(true)
        }
    }





    return (
        <>
        <button
        onClick={handleSync}
        style={{ float: "right", marginBottom: 10 }} className="btn btn-lg btn-dark btn-block"
        >sync offline data
        </button>
        <div>
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="DATA SYNC FAILED! you must be connected to the internet to preform this operation!"
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
export default SyncBtn
