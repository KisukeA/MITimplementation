import { Link } from "react-router-dom";
import { useEffect, useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Filters from "../Filters/Filters.js";
import Settings from "../Settings/Settings.js";
import "./CreateEvent.css";

const CreateEvent = ({closing, setClosing}) => {
    return (
        <div className={`create-wrapper ${closing?"closing":""}`}>
            <button onClick={()=>{setClosing(true)}} className="create-exit-btn"><FontAwesomeIcon icon={faArrowLeft} /></button>
            <div className="create-form main-content">
                <div className="create-form-group">
                    <label> Event Title </label>
                    <input className="create-form-input" placeholder="Event name"></input>
                </div>
                <div className="create-form-datetime">
                    <div className="create-form-date">
                        <label> Date </label>
                        <input className="create-form-date-input" type="date"></input>
                    </div>
                    <div className="create-form-time">
                        <label> Time </label>
                        <input className="create-form-time-input" type="time"></input>
                    </div>
                </div>
                <div className="create-form-group">
                    <label> Description </label>
                    <input className="create-form-input" placeholder="Describe your event"></input>
                </div>
                <div className="create-form-group">
                    <label> Place </label>
                    <div className="create-form-input" id = "locationgroup">
                        <input id = "locationinput" placeholder="Event location"></input>
                        <label htmlFor="locationinput"><FontAwesomeIcon icon={faLocationDot} /></label>
                    </div>
                </div>
                <div className="create-upload">
                    <label> Upload Images </label>
                    <div className="create-images">    
                        <div>+</div>
                        <div>+</div>
                        <div>+</div>
                    </div>
                </div>
            </div>
            <button className="create-event-btn full-screen bottom-row">
                CREATE EVENT
            </button>
        </div>
    )
  }
  
export default CreateEvent