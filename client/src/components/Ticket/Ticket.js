import { Link, useParams, useNavigate} from 'react-router-dom';
import { React, useState, useContext, useRef, useEffect } from "react";
import { makeRequest } from "../../axios.js";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "./Ticket.css";
const Ticket = ({ticket}) => {

    // const queryClient = useQueryClient();
    // const mutation = useMutation({
    //   mutationFn: (ticket) => {
    //     return makeRequest.post('/ticket', ticket);
    //   },
    //   onSuccess: (data) => {
    //     setOpenTicket(false);
    //     //setSuccesfullPay(true) maybe add some notification 
    //     queryClient.invalidateQueries(["singleevent",event.id]);
    //   },
    // });
    const handlePay =  () => {
        // mutation.mutate({ eventId:event.id,
        //   price:event.price, eventCreator: event.creator_id });
    }
    return (
      <div className="ticket">
        <button ><FontAwesomeIcon icon={faArrowLeft} /></button>
        <br></br>
        <span>Price </span>
        <button onClick={handlePay}>pay</button>
      </div>
    )
  }
  
export default Ticket