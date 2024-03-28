import { Link, useParams, useNavigate} from 'react-router-dom';
import { React, useState, useContext, useRef, useEffect } from "react";
import { makeRequest } from "../../axios.js";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faLocationDot,faCalendarDays, faClock, faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';
import "./singleevent.css"; 

const SingleEvent = () => {
    const { user } = useContext(AuthContext);
    // Access URL parameters
    const { eventId } = useParams();
    const [ closingEvent, setClosingEvent ] = useState(false)  
    let navigate = useNavigate();
    useEffect(() => {
        if (closingEvent) {
            
            const timer = setTimeout(() => {
                setClosingEvent(false);
                return navigate('/');
            }, 500);//don't change number, corresponds to animation duration
            return () => clearTimeout(timer);
        }
    }, [closingEvent]);
    return (
        <div className={`single-wrapper ${closingEvent?'closingEvent':''}`}>
            <button className="single-exit-btn" onClick={()=>{setClosingEvent(true)}}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <img className='single-image full-screen'></img>
            <div className="single-form single-main-content">
                
                <div className="single-form-group">
                    <div className='single-meta'>
                        <label> Event Title </label>
                        <div className='single-meta-icons'>
                            <div>
                                <FontAwesomeIcon icon={faCalendarDays} /><span> 09 May 24 </span>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faClock} /><span> 22:00 </span>
                            </div>
                            <div>
                            <FontAwesomeIcon icon={faChampagneGlasses} /><span> Party</span>
                            </div>
                        </div>
                    </div> 
                    <span className="single-title"> Pub Quiz</span>
                </div>
                <div className="single-form-group">
                    <label> Description </label>
                    <span className="single-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
                </div>
                <div className="single-going">
                    <label> People going </label>
                    <div className="single-avatars">
                      <div className="going-img"></div>
                      <div className="going-img"></div>
                      <div className="going-img"></div>
                      <div className="going-img"></div>
                      <div className="going-img"></div>
                    </div>
                </div>
            </div>
            <button className="single-event-btn full-screen last-row">
                I WANT TO GO
            </button>
        </div>
    )
  }
  
export default SingleEvent