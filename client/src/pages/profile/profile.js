import { useContext, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import { AuthContext } from "../../context/AuthContext.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Analysis from "../../components/Analysis/Analysis.js";
import ProfileSettings from "../../components/ProfileSettings/ProfileSettings.js";
import EditProfile from "../../components/EditProfile/EditProfile.js";
import Event from "../../components/Event/Event.js";
import Nav from "../../components/Nav/Nav.js";
import Ticket from "../../components/Ticket/Ticket.js";
import "./profile.css";

const Profile = () => {
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const { user } = useContext(AuthContext);
  const [ openProfileSettings, setOpenProfileSettings ] = useState(false);
  const [ openEditProfile, setOpenEditProfile ] = useState(false);
  const [ openAnalysis, setOpenAnalysis ] = useState(false);

  const { isLoading:uLoading, error:uError, data:profileData } = useQuery({
    queryKey: ["profile"], 
    queryFn: () => {
    return makeRequest.get(`/user/${user.id}`).then((res)=>{
      return res.data;
    })}
  });
  const { isLoading:eLoading, error:eError, data:events } = useQuery({
    queryKey: ["myevents"], 
    queryFn: () => {
    return makeRequest.get('/event/myevents').then((res)=>{
      return res.data;
    })}
  });
  const { isLoading:tLoading, error:tError, data:tickets } = useQuery({
    queryKey: ["tickets"], 
    queryFn: () => {
    return makeRequest.get('/ticket/').then((res)=>{
      return res.data;
    })}
  });
  const { isLoading, error, data:follow } = useQuery({
    queryKey:["follow", userId],
    queryFn: () =>{
      return makeRequest.get("/follow").then((res) => {
        return res.data;
      })
    }
  });
    return (
      <div className="profile">
        <div className="profile-bg-circle">
          <img className = "profile-picture"></img>
        </div>
        <div className = "profile-content">
          <Link to={`/`} className="profile-back-icon">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          {/* <SettingsIcon onClick={()=>{setOpenProfileSettings(true)}} className="profile-settings-icon"/> */}
          <h1>PROFILE</h1>
          <div className="profile-info">
            <div className="profile-username-wrapper">
              <span className="profile-username">{user.username}</span>
              <span className="profile-user-desc">{profileData?.profession} </span>
            </div>
            <span className="profile-user-bio">{profileData?.bio}</span>
            <div className="profile-stats">
              <span className="profile-stat-field">{events?.length} EVENTS</span>
              <span className="profile-stat-field">{follow?.followers} {follow?.followers === 1?"FAVORER":'FAVORERS'}</span>
              <span className="profile-stat-field">{follow?.following} FAVORING</span>
            </div>
          </div>
            <div className="profile-buttons">
              <button className="profile-button" onClick={()=>{setOpenEditProfile(true)}}>EDIT</button>
              <button className="profile-button" onClick={()=>{setOpenProfileSettings(true)}}>SETTINGS</button>
            </div>
          <div id = "tickets-container" className="profile-events-tickets">
            <div className="profile-events">
              {eError
                  ? "Something went wrong!"
                  : eLoading
                  ? "loading"
                  : events?.length > 0 ? events.map((event) => <Event profilePage={true} openAnalysis={openAnalysis} setOpenAnalysis={setOpenAnalysis} event={event} key={event.id} />)
                  : "no events"
              }
            </div>
            <div className="profile-tickets" id = "tickets">
              {tError
                  ? "Something went wrong!"
                  : tLoading
                  ? "loading"
                  : tickets?.length > 0 ? tickets.map((ticket) => <Ticket profilePage={true} ticket={ticket} key={ticket.id} />)
                  : "no events"
              }
            </div>
          </div>
        </div>
        <Nav />
        {openProfileSettings && <ProfileSettings setOpenProfileSettings={setOpenProfileSettings} />}
        {openEditProfile && <EditProfile setOpenEditProfile={setOpenEditProfile} />}
        {openAnalysis && <Analysis setOpenAnalysis={setOpenAnalysis}/>}
      </div>
    )
  }
  
export default Profile