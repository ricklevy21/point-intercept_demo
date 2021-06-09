//dependencies
import React from 'react'
import homeImage from './homeImage2.png'
import './styles.css'


const Home = () => {
    //open indexedDB to create stores fro offline data
    const request = window.indexedDB.open("point-intercept", 1);
    //create schema for indexedDB
    request.onupgradeneeded = event => {
        const db = event.target.result;
        //create object store for projects with a projectID keypath that can be used to query on
        const projectsStore = db.createObjectStore("projects", {keyPath: "_id"});
        const transectsStore = db.createObjectStore("transects", {keyPath: "_id"})
        const pointsStore = db.createObjectStore("points", {keyPath: "_id"})
    }
    return (
        <>
        <img id="homeImage" className="img-fluid" src={homeImage} alt="homeImage"/>
        </>
    )
}

export default Home