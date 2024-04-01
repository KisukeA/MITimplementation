import { Link } from "react-router-dom";
import { useEffect, useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext.js";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { makeRequest } from "../../axios.js" ;
import Map from "../Map/Map.js";
import "./CreateEvent.css";

const CreateEvent = ({closing, setClosing}) => {
    const [ openLocation, setOpenLocation ] = useState(false);
    const [ eventData, setEventData ] = useState({
        title:"",
        date:"",
        time:"",
        description:"",
        place:"",
        longitude:"",
        latitude:"",
        category:"",
    })
    const [ error, setError ] = useState(null);
    const [ success, setSuccess ] = useState(false);
    const locationRef = useRef();
    const updateEventData = (e) => {
        setEventData((prev) => ({...prev, [e.target.name]:e.target.value}))
    }
    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError('');
                setSuccess(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
      }, [error, success]);
    const handleClickOutside = (event) => {
        if (locationRef.current && !locationRef.current.contains(event.target)) {
            setOpenLocation(false);
        }
    };
    useEffect(() => {
        if (openLocation) {
            document.addEventListener('click', handleClickOutside, true);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [openLocation]);
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: (newEvent) => {
        return makeRequest.post("/event", newEvent);
      },
      onSuccess: (data) => {
          // Invalidate and refetch
          setEventData({
              title:"",
              date:"",
              time:"",
              description:"",
              place:"",
              longitude:"",
              latitude:"",
              category:"",
          });
          queryClient.invalidateQueries(["events","trending"]);
          setSuccess(true);
      },
    });
    const createEvent = (e) => {
        e.preventDefault();
        if(eventData.title.length === 0 || eventData.place.length === 0 || eventData.date.length === 0
            || eventData.description.length === 0 || eventData.time.length === 0){
          setError("Please fill in all the fields");
          return;
        }
        mutation.mutate(eventData);
    }
    console.log(eventData);
    return (
        <div className={`create-wrapper ${closing?"closing":""}`}>
            <button onClick={()=>{setClosing(true)}} className="create-exit-btn"><FontAwesomeIcon icon={faArrowLeft} /></button>
            <div className="create-form-group category-group">
                    <label htmlFor="create-form-category"> Category </label>
                    <select id="create-form-category" className="create-form-input"
                        name="category" value={eventData.category} onChange={updateEventData}>
                        <option value="" disabled> Choose a category </option>
                        <option value="party"> Party </option>
                        <option value="festival"> Festival </option>
                        <option value="concert"> Concert </option>
                        <option value="bar"> Bar </option>
                        <option value="sport"> Sport </option>
                    </select>
                </div>
            <div className="create-form main-content">
                <div className="create-form-group">
                    <label htmlFor="create-form-title"> Event Title </label>
                    <input className="create-form-input" placeholder="Event name"
                    name="title" id="create-form-title" value={eventData.title} onChange={updateEventData}></input>
                </div>
                <div className="create-form-datetime">
                    <div className="create-form-date">
                        <label htmlFor="create-form-date"> Date </label>
                        <input className="create-form-date-input" type="date"
                        name="date" id = "create-form-date" value={eventData.date} onChange={updateEventData}></input>
                    </div>
                    <div className="create-form-time">
                        <label htmlFor="create-form-time"> Time </label>
                        <input className="create-form-time-input" type="time"
                        name="time" id="create-form-time" value={eventData.time} onChange={updateEventData}></input>
                    </div>
                </div>
                <div className="create-form-group">
                    <label htmlFor="create-form-description"> Description </label>
                    <input className="create-form-input" placeholder="Describe your event"
                    name="description" id = "create-form-description" value={eventData.description} onChange={updateEventData}></input>
                </div>
                <div className="create-form-group">
                    <label> Place </label>
                    <div className="create-form-input" id = "locationgroup">
                        <input id = "locationinput" placeholder="Event location" disabled
                        name="place" value={eventData.place} onChange={updateEventData}></input>
                        <button onClick={()=>{console.log("ds");setOpenLocation(true)}} htmlFor="locationinput"><FontAwesomeIcon icon={faLocationDot} /></button>
                        {openLocation && <Map locationRef={locationRef} setEventData={setEventData} setOpenLocation={setOpenLocation} />}
                    </div>
                </div>
                <div className="create-upload">
                    <label> Upload Images </label>
                    <div className="create-images">    
                        <label htmlFor="picture1">+</label>
                        <input type="file" id="picture1"></input>
                        <label htmlFor="picture2">+</label>
                        <input type="file" id="picture2"></input>
                        <label htmlFor="picture3">+</label>
                        <input type="file" id="picture3"></input>
                    </div>
                </div>
            </div>
            {error && <span className="create-event-error">{error}</span>}
            {success && <span className="create-event-success">Event created!</span>}
            <button className="create-event-btn full-screen bottom-row" onClick={createEvent}>
                CREATE EVENT
            </button>
        </div>
    )
  }
  
export default CreateEvent