import { useContext, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import { AuthContext } from "../../context/AuthContext.js";
import { ReactComponent as SettingsIcon } from '../../assets/settingswhite.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Settings from "../../components/Settings/Settings.js";
import Event from "../../components/Event/Event.js";
import Nav from "../../components/Nav/Nav.js";
import "./userprofile.css";

const UserProfile = ({setSearchOpen}) => {
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
  const [following, setFollowing] = useState(false);
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
      <div className="userprofile">
        <div className="userprofile-bg-circle">
          <img className = "userprofile-picture"></img>
          </div>
        <div className = "userprofile-content">
          <FontAwesomeIcon icon={faArrowLeft} className="userprofile-back-icon"/>
          <h1>userprofile</h1>
          <SettingsIcon className="userprofile-settings-icon"/>
          <div className="userprofile-info">
            <div className="userprofile-username-wrapper">
              <span className="userprofile-username">{user.username}</span>
              <span className="userprofile-user-desc">Profession/What are you?</span>
            </div>
            <span className="userprofile-user-bio">Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusmod tempor.</span>
            <div className="userprofile-buttons">
              <button className={`userprofile-button ${following?'following':''}`} onClick={()=>{setFollowing(!following)}}>{following?'FOLLOWING':'FOLLOW'}</button>
              <button className="userprofile-button">MESSAGE</button>
            </div>
          </div>
          <div className="userprofile-stats">
            <span className="userprofile-stat-field">0 EVENTS</span>
            <span className="userprofile-stat-field">0 FOLLOWERS</span>
            <span className="userprofile-stat-field">0 FOLLOWING</span>
          </div>
          <div className="userprofile-events">
            <Event event={event} />
            <Event event={event} />
            <Event event={event} />
            <Event event={event} />
          </div>
        </div>
        <Nav setSearchOpen={setSearchOpen} />
      </div>
    )
  }
  
export default UserProfile