import axios from 'axios'

export default {

    //Create and add a new Project
    //method: POST
    addProject: function(projectData) {
        return axios.post("/api/projects", projectData);
    },

    //View all projects
    //method: Get
    getProjects: function(projectData) {
        return axios.get("/api/projects", projectData)
    },

    //Get one project by _id
    //method: GET
    getProjectByID: function(projectData){
        return axios.get("/api/projects/" + projectData, projectData)
    },

    //Create a transect and add it to a project
    //method: POST
    addTransect: function(transectData) {
        return axios.post("/api/transects", transectData)
    },

    //Get a transect by the transect's ID
    //method: GET
    getTransectById: function(transectData) {
        return axios.get("/api/transects/" + transectData, transectData)
    },

    //Find a transect based on ID and update
    //method: PUT
    updateTransectById: function(transectData) {
        return axios.put("/api/transects/" + transectData, transectData)
    },

    //Create a point and add it to a transect
    //method: POST
    addPoint: function(pointData) {
        return axios.post("/api/points", pointData)
    },

    //Get all transects and all of their point data for a project (by project ID)
    //method: GET
    getProjectData: function(projectDataAll) {
        return axios.get("/api/data/" + projectDataAll, projectDataAll)
    },
    
    //create a new user
    //method: POST
    registerUser: function(regData) {
        return axios.post("/api/register", regData)
    },

    //login the user
    //method: GET
    loginUser: function(loginInfo){
        return axios.post("/api/login", loginInfo)
    },

    //edit a point's data
    //method: PUT
    updateProjectData: function(updatedData){
        return axios.put("/api/edit", updatedData)
    }
}