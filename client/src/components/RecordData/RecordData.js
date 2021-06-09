//dependencies
import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Input, SubmitBtn } from "../../components/Form";
import {useHistory, useParams } from 'react-router-dom'
import RecordTransectName from "./RecordTransectName"
import { HitInputSelect } from "./HitInputSelect"
import { GroundInputSelect } from "./GroundInputSelect"
import PointInput from "./PointInput"
import { WoodyInputSelect } from "./WoodyInputSelect"
import cryptoRandomString from 'crypto-random-string'

const RecordData = () => {

    //get _id param (transectID) so that it can be accessed to for displaying data and for adding t
    const { _id } = useParams()

    const history = useHistory()

    //hook for state where transect name is displayed
    const [transect, setTransect] =useState([])
    //hook for state of point data form
    const [pointFormObject, setPointFormObject] = useState({
        point: "0",
        groundSurface: "",
        soilMoisture: "",
        shrubDensity: "",
        canopyScore: "",
        firstHit: "",
    })

    //SECOND HITS//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //hook for state of second hits values (array of names)
    const [secondHits, setSecondHits] = useState([])
    //hook for state of second hits input field
    const [secondHitInput, setSecondHitInput] = useState("")

    //function to add the value in the input field to the to the list of second hit values
    const handleSecondHitSumbit = () => {
        if (secondHitInput.length > 0) {
            setSecondHits(secondHits => [...secondHits, secondHitInput])
            //setSecondHits(secondHits => secondHits.concat(secondHitInput))
            setSecondHitInput("")
        }
    }
    
    //function to update the secondHitInput as user types
    function updateSecondHitInput({ target }) {
        setSecondHitInput(target.value);
    }

    //have enter key submit value
    const keyPressed = ({ key }) => {
        if (key === "Enter") {
            handleSecondHitSumbit()
        }
      }

    
    const submitSecondHitHandler = e => {
        // Prevent form submission on Enter key
        e.preventDefault()
      }

    //component ----maybe should save in abother file, but gotta figure out props
    const Search = ({ secondHitInput }) => <li>{secondHitInput}</li>

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    //CANOPY TAXA//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //hook for state of canopy taxa values (array of names)
    const [canopyTaxa, setCanopyTaxa] = useState([])
    //hook for state of canopy taxa input field
    const [canopyTaxaInput, setCanopyTaxaInput] = useState("")

    //function to add the value in the input field to the to the list of canoipy taxa values
    const handleCanopyTaxaSumbit = () => {
        if (canopyTaxaInput.length > 0) {
            setCanopyTaxa(canopyTaxa => [...canopyTaxa, canopyTaxaInput])
            //setCanopyTaxa(canopyTaxa => canopyTaxa.concat(canopyTaxaInput))
            setCanopyTaxaInput("")
        }
    }
    
    //function to update the canopyTaxaInput as user types
    function updateCanopyTaxaInput({ target }) {
        setCanopyTaxaInput(target.value);
    }

    //have enter key submit value
    const keyPressedCanopy = ({ key }) => {
        if (key === "Enter") {
            handleCanopyTaxaSumbit()
        }
      }
    
    const submitCanopyTaxaHandler = e => {
        // Prevent form submission on Enter key
        e.preventDefault()
      }

    //component ----maybe should save in another file, but gotta figure out props
    const SearchCanopy = ({ canopyTaxaInput }) => <li>{canopyTaxaInput}</li>

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    //SHRUB DENSITY//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //hook for state of shrub density values (array of objects (taxon and count))
    const [shrubDensityArr, setShrubDensityArr] = useState([])
    //hook for state of shrub taxa input field
    const [shrubTaxaInput, setShrubTaxaInput] = useState("")
    //hook for state of shrub count input field
    const [shrubCountInput, setShrubCountInput] = useState("")
    //hook for total shrub density stem count
    //const [totalStemCount, setTotalStemCount] = useState(0)

    //function to add the values in the input fields to the to the array of shrub objects
    const handleShrubSumbit = () => {
        if (shrubTaxaInput.length > 0 && shrubCountInput.length > 0) {
            setShrubDensityArr([...shrubDensityArr, {
                id: shrubDensityArr.length,
                shrubTaxon:shrubTaxaInput,
                shrubCount:shrubCountInput
            }])
            setShrubTaxaInput("")
            setShrubCountInput("")
        }
    }
    
    //function to update the shrubTaxaInput as user types
    function updateShrubTaxaInput({ target }) {
        setShrubTaxaInput(target.value);
    }
    //function to update the shrubCountInput as user types
    function updateShrubCountInput({ target }) {
        setShrubCountInput(target.value);
    }
    
    const submitShrubDensityArrHandler = e => {
        // Prevent form submission on Enter key
        e.preventDefault()
      }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    //display the transectName on the page once the component mounts 
    useEffect(() => {
        //get the transect name from the mongo db database if there is a network connection
        if (navigator.onLine){
            //GET Method for pulling transect name
            API.getTransectById(_id)
            .then(res => {
                setTransect(res.data)
            })
            .catch(err => console.log(err))
        //get the transect name from indexedDB if there is no network connection
        } else{
            //method for pulling transect name from indexedDB
            const request = window.indexedDB.open("point-intercept", 1);
            //get the transect name from the indexedDB database, based on the "_id" in the params
            request.onsuccess = () => {
                const db = request.result
                const transaction = db.transaction(["transects"], "readwrite")
                const transectsStore = transaction.objectStore("transects")
                const getRequest = transectsStore.get(_id);
                getRequest.onsuccess = () => {
                    console.log(getRequest.result.transect);
                    const transect = getRequest.result
                    setTransect(transect)
                };      
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //handles updating component state when user types into the input field
    function handleInputChange(event){
        const { name, value } = event.target;
        setPointFormObject({...pointFormObject, [name]: value})
    };

    //when the form is submitted, use API.addPoint method to save the project data
    //then navigate to a new Point Data Record page, with point incremented by 0.25
    function handlePointFormSubmitNext(event) {
        event.preventDefault(pointFormObject.firstHit)
        if (navigator.onLine){
            API.addPoint({
                point: pointFormObject.point,
                ground_surface: pointFormObject.groundSurface,
                soil_moisture_percentage: pointFormObject.soilMoisture,
                shrub_density_detail: JSON.stringify(shrubDensityArr),
                canopy_score: pointFormObject.canopyScore,
                canopy_taxa: canopyTaxa,
                hit_one: pointFormObject.firstHit,
                hit_two: secondHits,
                transectID: _id //this is the transect that I am adding the point to
            })
            .then(() => 
            
            {   const newPoint = parseFloat(pointFormObject.point) + 0.25
                
                setPointFormObject({
                point: newPoint,
                groundSurface: "",
                soilMoisture: "",
                canopyScore: "",
                firstHit: "",
            })
                setSecondHits([])
                setCanopyTaxa([])
                setShrubDensityArr([])
                //setTotalStemCount(0)
            })
                .catch(err => console.log(err))
        } else {
            //open the point-intercept indexedDB database
            const request = window.indexedDB.open("point-intercept", 1);
            //send the point form data to the indexedDB pointsStore object store
            request.onsuccess = () => {
                const db = request.result
                const transaction = db.transaction(["points"], "readwrite")
                const pointsStore = transaction.objectStore("points")
                const pointsObject = {
                    point: pointFormObject.point,
                    ground_surface: pointFormObject.groundSurface,
                    soil_moisture_percentage: pointFormObject.soilMoisture,
                    shrub_density_detail: JSON.stringify(shrubDensityArr),
                    canopy_score: pointFormObject.canopyScore,
                    canopy_taxa: canopyTaxa,
                    hit_one: pointFormObject.firstHit,
                    hit_two: secondHits,
                    transectID: _id, //this is the transect that I am adding the point to
                    _id: cryptoRandomString({length: 24})
                }
                console.log(pointsObject)
                pointsStore.add(pointsObject)
                const newPoint = parseFloat(pointFormObject.point) + 0.25
                setPointFormObject({
                    point: newPoint,
                    groundSurface: "",
                    soilMoisture: "",
                    canopyScore: "",
                    firstHit: "",
                })
                setSecondHits([])
                setCanopyTaxa([])
                setShrubDensityArr([])
            }
        }
        
    };


    //when the form is submitted, use API.addPoint method to save the project data
    //then navigate to the projects page
    function handlePointFormSubmitEnd(event) {
        event.preventDefault()
        if (navigator.onLine){
            API.addPoint({
                point: pointFormObject.point,
                ground_surface: pointFormObject.groundSurface,
                soil_moisture_percentage: pointFormObject.soilMoisture,
                shrub_density_detail: JSON.stringify(shrubDensityArr),
                canopy_score: pointFormObject.canopyScore,
                canopy_taxa: canopyTaxa,
                hit_one: pointFormObject.firstHit,
                hit_two: secondHits,
                transectID: _id //this is the transect that I am adding the point to
            })
            .then(res => {
                //add the desired route that I want to naviagte to to the end of the history array, thus making it the current page
                //send user to the page to add additional species for the transect (transect level data)
                history.push(`/additional/${_id}`)
            })
                .catch(err => console.log(err))
        } else {
            //open the point-intercept indexedDB database
            const request = window.indexedDB.open("point-intercept", 1);
            //send the point form data to the indexedDB pointsStore object store
            request.onsuccess = () => {
                const db = request.result
                const transaction = db.transaction(["points"], "readwrite")
                const pointsStore = transaction.objectStore("points")
                const pointsObject = {
                    point: pointFormObject.point,
                    ground_surface: pointFormObject.groundSurface,
                    soil_moisture_percentage: pointFormObject.soilMoisture,
                    shrub_density_detail: JSON.stringify(shrubDensityArr),
                    canopy_score: pointFormObject.canopyScore,
                    canopy_taxa: canopyTaxa,
                    hit_one: pointFormObject.firstHit,
                    hit_two: secondHits,
                    transectID: _id, //this is the transect that I am adding the point to
                    _id: cryptoRandomString({length: 24})
                }
                console.log(pointsObject)
                pointsStore.add(pointsObject)
                history.push(`/additional/${_id}`)
            }
        }
        
    };

    return (
        <>
        <div className="row">
            <div className="col">
                <RecordTransectName
                    id={transect._id}
                    transect={transect.transect}
                />
            </div>
        </div>
        <div className="row">
            <div className="col-auto">
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text">point</div>
                    </div>
                    <PointInput value={pointFormObject.point} type="number" step="0.25" min="0" name="point" id="point" onChange={handleInputChange}></PointInput>

                </div>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <div className="form-group">
                    <label>ground surface</label>
                    <GroundInputSelect value={pointFormObject.groundSurface} type="text" name="groundSurface" className="form-control" id="groundSurface" onChange={handleInputChange}></GroundInputSelect>
                </div>
                <div className="form-group">
                    <label>soil moisture percentage</label>
                    <Input value={pointFormObject.soilMoisture} type="number" name="soilMoisture" step="0.1" className="form-control" id="soilMoisture" min="0" onChange={handleInputChange}></Input>
                </div>
                <div className="form-group">
                    <label>shrub density</label>
                    <ul>
                        {shrubDensityArr.map(shrubDensityArrItem => (
                            <li key={shrubDensityArrItem.id}>{shrubDensityArrItem.shrubTaxon}{" : "}{shrubDensityArrItem.shrubCount}</li>
                        ))}
                    </ul>
                    <form className="form-inline" onSubmit={submitShrubDensityArrHandler}>
                        <WoodyInputSelect
                            className="form-control"
                            type="text"
                            onChange={updateShrubTaxaInput}
                            value={shrubTaxaInput}
                        />
                        <input
                            className="form-control"
                            type="number"
                            min="0"
                            max="50"
                            onChange={updateShrubCountInput}
                            value={shrubCountInput}
                        />
                        <button
                            className="btn btn-dark btn-sm"
                            type="button"
                            onClick={handleShrubSumbit}
                        >
                            +
                        </button>
                    </form>
                </div>
                {/* removed total shrub stem count */}
                {/* <div className="form-group">
                    <label>shrub density</label>
                    <Input value={pointFormObject.shrubDensity} type="number" name="shrubDensity" className="form-control" id="shrubDensity" min="0" onChange={handleInputChange}></Input>
                </div> */}
                <div className="form-group">
                    <label>canopy score (value from densiometer, not %)</label>
                    <Input value={pointFormObject.canopyScore} type="number" name="canopyScore" max="96" min="0" className="form-control" id="canopyScore" onChange={handleInputChange}></Input>
                </div>
                <div className="form-group">
                    <label>canopy taxa</label>
                    <ul>
                        {canopyTaxa.map((canopyTaxaInput, i) => (
                            <SearchCanopy
                            canopyTaxaInput={canopyTaxaInput}
                                key={canopyTaxaInput + i}
                            />
                        ))}
                    </ul>
                    <form className="form-inline" onSubmit={submitCanopyTaxaHandler}>
                        <WoodyInputSelect
                            className="form-control"
                            type="text"
                            onChange={updateCanopyTaxaInput}
                            onKeyPress={keyPressedCanopy}
                            value={canopyTaxaInput}
                        />
                        <button
                            className="btn btn-dark btn-sm"
                            type="button"
                            onClick={handleCanopyTaxaSumbit}
                        >
                            +
                        </button>
                    </form>
                </div>
                <div className="form-group">
                    <label>first hit</label>
                    <HitInputSelect
                    value={pointFormObject.firstHit}
                    name="firstHit"
                    className="form-control"
                    id="firstHit"
                    onChange={handleInputChange}
                    ></HitInputSelect>
                </div>
                <div className="form-group">
                    <label>second hit(s)</label>
                    <ul>
                        {secondHits.map((secondHitInput, i) => (
                            <Search
                                secondHitInput={secondHitInput}
                                key={secondHitInput + i}
                            />
                        ))}
                    </ul>
                    <form className="form-inline" onSubmit={submitSecondHitHandler}>
                        <HitInputSelect
                            className="form-control"
                            type="text"
                            onChange={updateSecondHitInput}
                            onKeyPress={keyPressed}
                            value={secondHitInput}
                        />
                        <button
                            className="btn btn-dark btn-sm"
                            type="button"
                            onClick={handleSecondHitSumbit}
                        >
                            +
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-4">
                <SubmitBtn
                    onClick={handlePointFormSubmitEnd}
                >
                    end transect
                </SubmitBtn>
            </div>
            <div className="col-8">
                <SubmitBtn
                    onClick={handlePointFormSubmitNext}
                >
                    next point
                </SubmitBtn>
            </div>
        </div>
        </>
    )
}

export default RecordData