import { useContext, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import { AuthContext } from "../../context/AuthContext.js";
import { ReactComponent as SettingsIcon } from '../../assets/settingswhite.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ProfileSettings from "../../components/ProfileSettings/ProfileSettings.js";
import Event from "../../components/Event/Event.js";
import Nav from "../../components/Nav/Nav.js";
import "./profile.css";

const Profile = ({setSearchOpen}) => {
  const event = {
    "id": 5,
    "description": "sdfa",
    "place": "Vojkovo Nabrežje / Riva Vojko 32, 6000 Koper, Slovenia",
    "category": "party",
    "price": 0,
    "creator_id": 10,
    "title": "aaa",
    "datetime": "2024-04-18T06:09:00.000Z",
    "thumbnail": null,
    "latitude": 45.548443,
    "longitude": 13.738011
}
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const { user } = useContext(AuthContext);
  const [ openProfileSettings, setOpenProfileSettings ] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey:["user",userId],
    queryFn: () =>{
      return makeRequest.get("/user/" + userId).then((res) => {
        console.log(res.data);
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
          <h1>PROFILE</h1>
          <div className="profile-info">
            <div className="profile-username-wrapper">
              <span className="profile-username">{user.username}</span>
              <span className="profile-user-desc">Profession/What are you?</span>
            </div>
            <span className="profile-user-bio">Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusmod tempor.</span>
            <div className="profile-buttons">
              <button className="profile-button">EDIT</button>
              <button className="profile-button" onClick={()=>{setOpenProfileSettings(true)}}>SETTINGS</button>
            </div>
          </div>
          <div className="profile-stats">
            <span className="profile-stat-field">0 EVENTS</span>
            <span className="profile-stat-field">0 FOLLOWERS</span>
            <span className="profile-stat-field">0 FOLLOWING</span>
          </div>
          <div className="profile-events">
            <Event event={event} />
            <Event event={event} />
            <Event event={event} />
            <Event event={event} />
          </div>
        </div>
        <Nav setSearchOpen={setSearchOpen} />
        {openProfileSettings && <ProfileSettings setOpenProfileSettings={setOpenProfileSettings} />}
      </div>
    )
  }
  
export default Profile