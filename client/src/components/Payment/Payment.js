import { Link, useParams, useNavigate} from 'react-router-dom';
import { React, useState, useContext, useRef, useEffect } from "react";
import { makeRequest } from "../../axios.js";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faLocationDot,faMapPin,faCalendarDays, faClock, faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';
import "./Payment.css";
const Payment = ({event, setOpenPayment}) => {

    const handlePay = () => {
        
    }
    return (
      <div className="payment">
        <button onClick={()=>{setOpenPayment(false)}}><FontAwesomeIcon icon={faArrowLeft} /></button>
        <br></br>
        <span style={{color: "green"}}>Price {event.price}</span>
        <button onClick={handlePay}>pay</button>
      </div>
    )
  }
  
export default Payment