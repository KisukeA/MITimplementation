import { Link, useParams, useNavigate} from 'react-router-dom';
import { React, useState, useContext, useRef, useEffect } from "react";
import { makeRequest } from "../../axios.js";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareEnvelope } from '@fortawesome/free-solid-svg-icons';
import "./Ticket.css";
import moment from "moment";
const Ticket = ({ticket}) => {

    const { user } = useContext(AuthContext);
    const [openEmailPopup, setOpenEmailPopup] = useState(false);

    return (
      <div className="ticket">
        {/* <button ><FontAwesomeIcon icon={faArrowLeft} /></button>
        <br></br> */}
        <span><Link to={`/singleevent/${ticket.id}`}>{ticket.title}</Link></span>
        <span>{new Date(ticket.datetime.split('T')[0]).toDateString().split(" ").slice(1,).join(" ")}</span>
        <div className='ticket-location'><span>{ticket.place}</span></div>
        {/* prolly don't need this check here to={`/${ticket.id===user.id?'':'user'}profile/${ticket.id}`} */}
        <span className='ticket-email'>
          <Link to={`/userprofile/${ticket.event_creator_id}`}>
            {ticket.username} 
          </Link> 
          <FontAwesomeIcon icon={faSquareEnvelope} onClick={()=>{setOpenEmailPopup(prev=>!prev)}}/>
          {openEmailPopup && <div className='ticket-email-popup'>
            {ticket.email?ticket.email:"no email"}
          </div>}
        </span>
        <span>Price: {ticket.price}€</span>
        <Link to={`/singleevent/${ticket.id}`} style={{ textDecoration: "none", color:"inherit"}}>
          <button className='ticket-button'>
            {moment().isBefore(ticket.datetime)?"View":"Review"}
          </button>
        </Link>
      </div>
    )
  }
  
export default Ticket