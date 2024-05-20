import { Link, useParams, useNavigate} from 'react-router-dom';
import { React, useState, useContext, useRef, useEffect } from "react";
import { makeRequest } from "../../axios.js";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faMapPin,faCalendarDays,faClock, 
  faHandHoldingHeart,faBeerMugEmpty,faIcons,faDrum,faHandPointer,faStore,faFootball,faMartiniGlassCitrus} from '@fortawesome/free-solid-svg-icons';
import Payment from "../../components/Payment/Payment.js";
import Rating from "../../components/Rating/Rating.js";
import moment from "moment";
import "./Analysis.css";

const Analysis = ({setOpenAnalysis, event}) => {

  const [closing, setClosing] = useState(false);
  let categoryIcon;
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
  const { isLoading, error, data:stats } = useQuery({
    queryKey: ["stats",event.id], 
    queryFn: () => {
    return makeRequest.get(`/ticket/stats?eventId=${event.id}`).then((res)=>{
      return res.data[0];
    })}
  });
  const { isLoading:gIsLoading, error:gError, data:going } = useQuery({
    queryKey: ["eventgoing",event.id], 
    queryFn: () => {
    return makeRequest.get(`/ticket/going?eventId=${event.id}`).then((res)=>{
      return res.data;
    })}
  });
  useEffect(() => {
      if (closing) {
          const timer = setTimeout(() => {
              setOpenAnalysis(false);
              setClosing(false);
          }, 400);//don't change number, corresponds to animation duration
          return () => clearTimeout(timer);
      }
    }, [closing]);
  return (
    <div className={`analysis ${closing?'closing-a':''}`}>
      <button className="analysis-exit-btn" onClick={()=>{setClosing(true)}}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <img className='analysis-image full-screen'></img>
      <div className="analysis-form analysis-main-content">
        <div className="analysis-form-group">
          <div className='analysis-meta'>
            <label> Event title </label>
            <div className='analysis-meta-icons'>
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
                {categoryIcon && <FontAwesomeIcon icon={categoryIcon} />}<span className='analysis-category'> {event?.category} </span>
              </div>
              <div style={{flexGrow:"1"}}>
                <FontAwesomeIcon icon={faMapPin} />
                <div style={{overflow:"auto", flexGrow:"1", maxWidth:"clamp(11ch,45vw,50ch)"}}>
                  <span className='analysis-category'> {event?.place} </span>
                </div>
              </div>
            </div>
          </div> 
            <span className="analysis-title"> {event?.title} </span>
        </div>
        <div className='analysis-rating'>
          <span>People's ratings</span>
          <div className='analysis-rating-stars'>
            <svg className="star" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset={`${event.rating >= 1?'100':event.rating>=0?((event.rating-Math.floor(event.rating))*100):0}%`} style={{ stopColor: 'yellow', stopOpacity: 1 }} />
                  <stop offset={`${event.rating >= 1?'100':event.rating>=0?((event.rating-Math.floor(event.rating))*100):0}%`} style={{ stopColor: 'grey', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="url(#grad1)" />
            </svg>
            <svg className="star" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
              <defs>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset={`${event.rating >= 2?100:event.rating>=1?((event.rating-Math.floor(event.rating))*100):0}%`} style={{ stopColor: 'yellow', stopOpacity: 1 }} />
                  <stop offset={`${event.rating >= 2?100:event.rating>=1?((event.rating-Math.floor(event.rating))*100):0}%`} style={{ stopColor: 'grey', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="url(#grad2)" />
            </svg>
            <svg className="star" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
              <defs>
                <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset={`${event.rating >= 3?100:event.rating>=2?((event.rating-Math.floor(event.rating))*100):0}%`} style={{ stopColor: 'yellow', stopOpacity: 1 }} />
                  <stop offset={`${event.rating >= 3?100:event.rating>=2?((event.rating-Math.floor(event.rating))*100):0}%`} style={{ stopColor: 'grey', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="url(#grad3)" />
            </svg>
            <svg className="star" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
              <defs>
                <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset={`${event.rating >= 4?100:event.rating>=3?((event.rating-Math.floor(event.rating))*100):0}%`} style={{ stopColor: 'yellow', stopOpacity: 1 }} />
                  <stop offset={`${event.rating >= 4?100:event.rating>=3?((event.rating-Math.floor(event.rating))*100):0}%`} style={{ stopColor: 'grey', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="url(#grad4)" />
            </svg>
            <svg className="star" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
              <defs>
                <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset={`${event.rating >= 5?100:event.rating>=4?((event.rating-Math.floor(event.rating))*100):0}%`} style={{ stopColor: 'yellow', stopOpacity: 1 }} />
                  <stop offset={`${event.rating >= 5?100:event.rating>=4?((event.rating-Math.floor(event.rating))*100):0}%`} style={{ stopColor: 'grey', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="url(#grad5)" />
            </svg>    
          </div>
        </div>
        {error? 'error' :
        isLoading?'loading'
        : <>
        <div className='analysis-statistics-group'>
          <span className='stat-title'>Attendence Rate</span>
          <span className = 'stat-subtitle'>The percentage of people who signed up for the event and actually attended.</span>
          <span className='stat-title bigger'>{stats.attended/stats.registered * 100}%</span>
        </div>
        <div className='analysis-statistics-group'>
          <span className='stat-title'>Age groups</span>
          <span className = 'stat-subtitle'> People that usually attend these kind of events:</span>
          <span className='stat-title bigger'>{stats.age}+</span>
        </div>
        <div className='analysis-statistics-group'>
          <span className='stat-title'>Gender distribution</span>
          <span className = 'stat-subtitle'> On average more <span className='bigger'>{stats.men>stats.women?'':'wo'}men{`(`+ `${stats.men/(stats.men+stats.women) * 100}` +`%)`} </span>
            visit this place than <span className='bigger'>{stats.men>stats.women?'wo':''}women{`(`+ `${stats.women/(stats.men+stats.women) * 100}` +`%)`}</span>.
          </span>
        </div>
        </>}
        <div className="analysis-going">
          <label> People going </label>
          <div className="analysis-avatars" style={{'--going':`${Math.min(5,going.length)}`}}>
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
    </div>
  )
}
  
export default Analysis