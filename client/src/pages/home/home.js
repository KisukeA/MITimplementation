import { useContext, useEffect, useRef, useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import { AuthContext } from "../../context/AuthContext.js";
import { ReactComponent as SettingsIcon } from '../../assets/settingsicon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart,faBeerMugEmpty,faIcons,faDrum,faHandPointer,faStore,faFootball,faMartiniGlassCitrus } from '@fortawesome/free-solid-svg-icons';
import Settings from "../../components/Settings/Settings.js";
import Event from "../../components/Event/Event.js";
import Nav from "../../components/Nav/Nav.js";
import Search from "../../components/Search/Search.js";
import "./home.css";

const Home = () => {

  const { user } = useContext(AuthContext);
  const [ category, setCategory ] = useState("");
  const [ settingsOpen, setSettingsOpen ] = useState(false);
  const settingsRef = useRef();
  const queryClient = useQueryClient();
  const [ searchOpen, setSearchOpen ] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["events", category], 
    queryFn: () => {
    return makeRequest.get(`/event?upcoming=true&category=${category}`).then((res)=>{
      return res.data;
    })}
  });
  const { isLoading:tIsLoading, error:tError, data:trending } = useQuery({
    queryKey: ["trending", category], 
    queryFn: () => {
    return makeRequest.get(`/event?upcoming=false&category=${category}`).then((res)=>{
      return res.data;
    })}
  });
  const { isLoading:fIsLoading, error:fError, data:favorite } = useQuery({
    queryKey: ["favorite", category], 
    queryFn: () => {
    return makeRequest.get(`/event/favorite?category=${category}`).then((res)=>{
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
      {searchOpen && <Search searchOpen={searchOpen} setSearchOpen={setSearchOpen} />}
      <div className="home-categories-wrapper">
        <div className="home-categories-header">
          <h2>Categories</h2>
          <span className="home-categories-show">Show all</span>
        </div>
        <div className="home-categories-field"> 
          <button className={`category ${category==="party"?"active-category":""}`} 
          name="party" onClick={()=>{setCategory(category==="party"?"":"party")}}>
            <FontAwesomeIcon icon={faMartiniGlassCitrus} />
          </button>
          <button className={`category ${category==="festival"?"active-category":""}`} 
          name="festival" onClick={()=>{setCategory(category==="festival"?"":"festival")}}>
            <FontAwesomeIcon icon={faIcons} />
          </button>
          <button className={`category ${category==="concert"?"active-category":""}`} 
          name="concert" onClick={()=>{setCategory(category==="concert"?"":"concert")}}>
            <FontAwesomeIcon icon={faDrum} />
          </button>
          <button className={`category ${category==="rave"?"active-category":""}`} 
          name="rave" onClick={()=>{setCategory(category==="rave"?"":"rave")}}>
            <FontAwesomeIcon icon={faHandPointer} />
          </button>
          <button className={`category ${category==="charity"?"active-category":""}`} 
          name="charity" onClick={()=>{setCategory(category==="charity"?"":"charity")}}>
            <FontAwesomeIcon icon={faHandHoldingHeart} />
          </button>
          <button className={`category ${category==="sport"?"active-category":""}`} 
          name="sport" onClick={()=>{setCategory(category==="sport"?"":"sport")}}>
            <FontAwesomeIcon icon={faFootball} />
          </button>
          <button className={`category ${category==="fair"?"active-category":""}`} 
          name="fair" onClick={()=>{setCategory(category==="fair"?"":"fair")}}>
            <FontAwesomeIcon icon={faStore} />
          </button>
          <button className={`category ${category==="bar"?"active-category":""}`} 
          name="bar" onClick={()=>{setCategory(category==="bar"?"":"bar")}}>
            <FontAwesomeIcon icon={faBeerMugEmpty} />
          </button>
          {/*this will most likely be a mapping or a component */}
        </div>
      </div>
      <div className="home-main">
        <div className="home-trending">
          <h2 className="home-trending-header">Trending events</h2>
          <div className="events-wrapper">
            {/*this will most likely be a mapping or a component */}
            {tError
              ? "Something went wrong!"
              : tIsLoading
              ? "loading"
              : trending?.length > 0 ? trending.map((event) => <Event event={event} key={event.id} />)
              : "no events"
            }
          </div>
        </div>
        <div className="home-upcoming">
          <h2 className="home-upcoming-header">Upcoming events</h2>
          {/*this will most likely be a mapping or a component */}
          <div className="events-wrapper">
            {/*this will most likely be a mapping or a component */}
            {error
              ? "Something went wrong!"
              : isLoading
              ? "loading"
              : data?.length > 0 ? data.map((event) => <Event event={event} key={event.id} />)
              : "no events"
            }
          </div>
        </div>
        <div className="home-favorite">
          <h2 className="home-favorite-header">Favorite events</h2>
          {/*this will most likely be a mapping or a component */}
          <div className="events-wrapper">
            {/*this will most likely be a mapping or a component */}
            {fError
              ? "Something went wrong!"
              : fIsLoading
              ? "loading"
              : favorite?.length > 0 ? favorite.map((event) => <Event event={event} key={event.id} />)
              : "no events"
            }
          </div>
        </div>
      </div>
      <Nav setSearchOpen={setSearchOpen} homePage={true} />
    </div>
  )
}

export default Home