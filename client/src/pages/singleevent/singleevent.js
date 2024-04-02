import { Link, useParams, useNavigate} from 'react-router-dom';
import { React, useState, useContext, useRef, useEffect } from "react";
import { makeRequest } from "../../axios.js";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faMapPin,faCalendarDays,faClock,
    faHandHoldingHeart,faBeerMugEmpty,faIcons,faDrum,faHandPointer,faStore,faFootball,faMartiniGlassCitrus } from '@fortawesome/free-solid-svg-icons';
import Payment from "../../components/Payment/Payment.js";
import "./singleevent.css"; 

const SingleEvent = () => {
    //!!!IMPORTANT!!! MOST LIKELY WILL MAKE THIS A COMPONENT INSTEAD OF A PAGE, XDXDXD
    const { user } = useContext(AuthContext);
    // Access URL parameters
    const { eventId } = useParams();
    const [ openPayment, setOpenPayment ] = useState(false);
    const [ closingEvent, setClosingEvent ] = useState(false)  
    const navigate = useNavigate();
    let categoryIcon;
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
            console.log(res.data)
          return res.data;
        })}
    });
    const { isLoading:gIsLoading, error:gError, data:going } = useQuery({
        queryKey: ["eventgoing",eventId], 
        queryFn: () => {
        return makeRequest.get(`/ticket/going?eventId=${eventId}`).then((res)=>{
          return res.data;
        })}
      });
      switch (event?.category) {
        case "party":
            categoryIcon = faMartiniGlassCitrus;
            break;
        case "festival":
            categoryIcon = faIcons;
            break;
        case "concert":
            categoryIcon = faDrum;
            break;
        case "bar":
            categoryIcon = faBeerMugEmpty;
            break;
        case "charity":
            categoryIcon = faHandHoldingHeart;
            break;
        case "sport":
            categoryIcon = faFootball;
            break;
        case "rave":
            categoryIcon = faHandPointer;
            break;
        case "fair":
            categoryIcon = faStore;
            break;
      }
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
                                {categoryIcon && <FontAwesomeIcon icon={categoryIcon} />}<span className='single-category'> {event?.category} </span>
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
                      {gIsLoading? "loading":
                       gError? "error":
                       going.length > 0 ?
                        going.map((user, index)=>(
                        <div  key={index}>{parseInt(index) < 5 ? //only 5 will be previewed
                            (index===4 && going.length - 5 > 0) ? //if there is more than 5
                            //the 5th one will say that there are X more
                            <span className='going-img and-more'>+{going.length - 5}</span>
                            : 
                            <img className='going-img'  
                              src={`/upload/${user.profile_picture?user.profile_picture:'default.png'}`}>
                            </img>
                            : <></> //else we don't display it
                        }</div>)): 
                       <p style={{margin:"0"}}>none, yet</p>
                      }
                    </div>
                </div>
            </div>
            <button className={`single-event-btn full-screen last-row ${event?.paid?'paid':''}`} onClick = {()=>{if(!event?.paid)setOpenPayment(true)}}> 
                {!event?.paid?'I WANT TO GO':'INTERESTED'}
            </button>
            {openPayment && <Payment setOpenPayment={setOpenPayment} event={event}/>}
        </div>
    )
  }
  
export default SingleEvent