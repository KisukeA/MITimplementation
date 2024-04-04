import { useContext, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import { AuthContext } from "../../context/AuthContext.js";
import { ReactComponent as SettingsIcon } from '../../assets/settingswhite.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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
  const { isLoading, error, data } = useQuery({
    queryKey:["user",userId],
    queryFn: () =>{
      return makeRequest.get("/user/" + userId).then((res) => {
        console.log(res.data);
        return res.data;
      })
    }
  });
  const { isLoading:eLoading, error:eError, data:events } = useQuery({
    queryKey: ["userevents"], 
    enabled: !!data,
    queryFn: () => {
    return makeRequest.get(`/event/userevents/${data.id}`).then((res)=>{
      console.log(res.data);
      return res.data;
    })}
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newFollow) => {
      return makeRequest.post("/follow", newFollow);
    },
    onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (follow) => {
      return makeRequest.delete("/follow/"+follow.followed_id);
    },
    onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
    },
  });
  const follow = () => {
    if(!data?.bFollowing) return mutation.mutate({followed_id:data.id});
    return deleteMutation.mutate({followed_id:data.id});
  }
  return (
    <div className="userprofile">
      <div className="userprofile-bg-circle">
        <img className = "userprofile-picture"></img>
        </div>
      <div className = "userprofile-content">
        <Link to={'/'} className="userprofile-back-icon">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h1>User Profile</h1>
        <SettingsIcon className="userprofile-settings-icon"/>
        <div className="userprofile-info">
          <div className="userprofile-username-wrapper">
            <span className="userprofile-username">{data?.username}</span>
            <span className="userprofile-user-desc">Profession/What are you?</span>
          </div>
          <span className="userprofile-user-bio">Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusmod tempor.</span>
          <div className="userprofile-stats">
              <span className="userprofile-stat-field">{events?.length} EVENTS</span>
              <span className="userprofile-stat-field">{data?.followers} {data?.followers === 1?"FAVORER":'FAVORERS'}</span>
              <span className="userprofile-stat-field">{data?.following} FAVORING</span>
          </div>
        </div>
          <div className="userprofile-buttons">
            <button className={`userprofile-button ${data?.bFollowing?'following':''}`} onClick={follow}>{data?.bFollowing?'UNFAVOR':'FAVORITE'}</button>
            <button className="userprofile-button">MESSAGE</button>
          </div>
        <div className="userprofile-events">
          {eError
            ? "Something went wrong!"
            : eLoading
            ? "loading"
            : events?.length > 0 ? events.map((event) => <Event event={event} key={event.id} />)
            : "no events"
          }
        </div>
      </div>
      <Nav setSearchOpen={setSearchOpen} />
    </div>
  )
  }
  
export default UserProfile