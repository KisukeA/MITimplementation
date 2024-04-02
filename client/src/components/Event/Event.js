import { Link } from "react-router-dom";
import { makeRequest } from "../../axios.js";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays,faClock,faThumbTack } from '@fortawesome/free-solid-svg-icons';
import "./Event.css";

const Event = ({event, profilePage}) => {
  const { isLoading:gIsLoading, error:gError, data:going } = useQuery({
    queryKey: ["eventgoing",event.id], 
    queryFn: () => {
    return makeRequest.get(`/ticket/going?eventId=${event.id}`).then((res)=>{
      return res.data;
    })}
  });  
  return (
    <div className="event">
      <img className="event-picture"></img>
      <div className="event-content">
        <div className="event-content-datetime">
          <div>
            <FontAwesomeIcon icon={faCalendarDays} /><span className="event-date"> {new Date(event.datetime.split('T')[0]).toDateString().split(" ").slice(1,).join(" ")} </span>
            </div>
          <div>
            <FontAwesomeIcon icon={faClock} /><span className="event-time"> {event.datetime.split('T')[1].split(":").slice(0,2).join(':')} </span> 
          </div>
        </div>
        <div className="event-content-location">
          <FontAwesomeIcon icon={faThumbTack} /> <span> {event.place}</span>
        </div>
        {!profilePage ?
          <div className="event-interact">
           <div className="event-coming"> 
              {gIsLoading? "loading":
              gError?"error":
              going.map((user, index)=>(
                <div key={index}>
                  {parseInt(index) < 5 && //only 5 will be previewed
                    (index===4 && going.length - 5 > 0) ? //if there is more than 5
                    //the 5th one will say that there are X more
                    <span className='placeholder-img and-more'>+{going.length - 5}</span>
                    : 
                    <img className='placeholder-img'
                      src={`/upload/${user.profile_picture?user.profile_picture:'default.png'}`}>
                    </img>
                  }
                </div>
              ))}
            </div>
            <Link to={`/singleevent/${event.id}`} style={{ textDecoration: "none", color:"inherit"}}>
              <button className="event-interested-button">Want to go</button>
            </Link>
          </div>:
          <button className="event-interested-button purple">Analyze</button>
        }
      </div>
    </div>
  )
}
  
export default Event