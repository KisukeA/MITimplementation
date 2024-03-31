import { Link, useParams, useNavigate} from 'react-router-dom';
import { React, useState, useContext, useRef, useEffect } from "react";
import { makeRequest } from "../../axios.js";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faLocationDot,faMapPin,faCalendarDays, faClock, faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';
import Payment from "../../components/Payment/Payment.js";
import "./singleevent.css"; 

const SingleEvent = () => {
    const { user } = useContext(AuthContext);
    // Access URL parameters
    const { eventId } = useParams();
    const [ openPayment, setOpenPayment ] = useState(false);
    const [ paid, setPaid ] = useState(false);
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
    const { isLoading, error, data:event } = useQuery({
        queryKey: ["singleevent",eventId], 
        queryFn: () => {
        return makeRequest.get(`/event/single?eventId=${eventId}`).then((res)=>{
          console.log(res.data);
          return res.data;
        })}
      });

    return (
        <div className={`single-wrapper ${closingEvent?'closingEvent':''}`}>
            <button className="single-exit-btn" onClick={()=>{setClosingEvent(true)}}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <img className='single-image full-screen'></img>
            <div className="single-form single-main-content">
                
                <div className="single-form-group">
                    <div className='single-meta'>
                        <label> Event title </label>
                        <div className='single-meta-icons'>
                            <div>
                                <FontAwesomeIcon icon={faCalendarDays} />
                                    <span> 
                                    {new Date(event?.datetime?.split('T')[0]).toDateString().split(" ").slice(1,).join(" ")} 
                                    </span>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faClock} />
                                <span> 
                                    {event?.datetime?.split('T')[1].split(":").slice(0,2).join(':')}  
                                </span>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faChampagneGlasses} /><span className='single-category'> {event?.category} </span>
                            </div>
                            <div style={{flexGrow:"1"}}>
                                <FontAwesomeIcon icon={faMapPin} />
                                <div style={{overflow:"auto", flexGrow:"1", maxWidth:"clamp(11ch,45vw,50ch)"}}>
                                    <span className='single-category'> {event?.place} </span>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <span className="single-title"> {event?.title} </span>
                </div>
                <div className="single-form-group">
                    <label> Description </label>
                     <span className="single-description"> {event?.description}{/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.*/}</span> 
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
            <button className={`single-event-btn full-screen last-row ${paid?'paid':''}`} onClick = {()=>{setPaid(!paid)}}>
                {/* onClick = {()=>{setOpenPayment(true)}}*/} 
                {!paid?'I WANT TO GO':'INTERESTED'}
            </button>
            {openPayment && <Payment setOpenPayment={setOpenPayment} event={event}/>}
        </div>
    )
  }
  
export default SingleEvent