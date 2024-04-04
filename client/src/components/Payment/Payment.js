import { Link, useParams, useNavigate} from 'react-router-dom';
import { React, useState, useContext, useRef, useEffect } from "react";
import { makeRequest } from "../../axios.js";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "./Payment.css";
const Payment = ({setPaid, event, setOpenPayment}) => {

    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: (ticket) => {
        return makeRequest.post('/ticket', ticket);
      },
      onSuccess: (data) => {
        setOpenPayment(false);
        //setSuccesfullPay(true) maybe add some notification 
        queryClient.invalidateQueries(["singleevent",event.id]);
      },
    });
    const handlePay =  () => {
        mutation.mutate({ eventId:event.id,
          price:event.price, eventCreator: event.creator_id });
    }
    return (
      <div className="payment">
        <button className='payment-back' onClick={()=>{setOpenPayment(false)}}><FontAwesomeIcon icon={faArrowLeft} /></button>
        <span>Price: {event.price}€</span>
        <span>Some card info</span>
        <span>Date</span>
        <span>Pin</span>
        <span>idk</span>
        <button className='payment-btn' onClick={handlePay}>pay</button>
      </div>
    )
  }
  
export default Payment