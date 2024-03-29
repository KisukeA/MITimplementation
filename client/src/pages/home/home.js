import { useContext, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import { AuthContext } from "../../context/AuthContext.js";
import { ReactComponent as SettingsIcon } from '../../assets/settingsicon.svg';
import Settings from "../../components/Settings/Settings.js";
import Event from "../../components/Event/Event.js";
import Nav from "../../components/Nav/Nav.js";
import Search from "../../components/Search/Search.js";
import "./home.css";

const Home = () => {

  const { user } = useContext(AuthContext);
  const [ settingsOpen, setSettingsOpen ] = useState(false);
  const settingsRef = useRef();

  const { isLoading, error, data } = useQuery({
    queryKey: ["events"], 
    queryFn: () => {
    return makeRequest.get('/event?upcoming=true').then((res)=>{
      console.log(res.data);
      return res.data;
    })}
  });

  return (
    <div className="home">
      <div className="home-header">
        <div className="home-header-content">
          <h2>Hi, {user.username} </h2>
          <span className="home-location"> {user.locationName} ddd</span> {/*this has to be fetched first from the db TODO*/}
        </div>
        <SettingsIcon onClick={()=>{setSettingsOpen(true)}} className="home-header-icon"/>
        {settingsOpen && <Settings settingsRef={settingsRef} settingsOpen = {settingsOpen} setSettingsOpen={setSettingsOpen} /> }
      </div>
      <Search />
      <div className="home-categories-wrapper">
        <div className="home-categories-header">
          <h2>Categories</h2>
          <span className="home-categories-show">Show all</span>
        </div>
        <div className="home-categories-field">
          <div className="category">
            <img className="category-image"></img>
          </div>
          <div className="category"></div><div className="category"></div><div className="category"></div><div className="category"></div><div className="category"></div><div className="category"></div>
          {/*this will most likely be a mapping or a component */}
        </div>
      </div>
      <div className="home-main">
        <div className="home-trending">
          <h2 className="home-trending-header">Trending events</h2>
          <div className="events-wrapper">
            {/*this will most likely be a mapping or a component */}
            {error
              ? "Something went wrong!"
              : isLoading
              ? "loading"
              : data.length > 0 ? data.map((event) => <Event event={event} key={event.id} />)
              : "no events"
            }{/* 
            <Event />
            <Event />
            <Event />
            <Event />
            <Event />*/}
          </div>
        </div>
        <div className="home-upcoming">
          <h2 className="home-upcoming-header">Upcoming events</h2>
          {/*this will most likely be a mapping or a component */}
          <div className="events-wrapper">
            {/*this will most likely be a mapping or a component */}
            {/*<Event />
            <Event />
            <Event />
            <Event />
          <Event />*/}
          </div>
        </div>
      </div>
      <Nav />
    </div>
  )
}

export default Home