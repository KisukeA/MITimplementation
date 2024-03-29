import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays,faClock,faThumbTack } from '@fortawesome/free-solid-svg-icons';
import "./Event.css";

const Event = ({event}) => {
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
          <div className="event-interact">
            <div className="event-coming">
              <div className="placeholder-img"></div>
              <div className="placeholder-img"></div>
              <div className="placeholder-img"></div>
              <div className="placeholder-img"></div>
              <div className="placeholder-img"></div>
            </div>
            <Link to={`/singleevent/${event.id}`} style={{ textDecoration: "none", color:"inherit"}}>
              <button className="event-interested-button">Want to go</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
export default Event