import { Link } from "react-router-dom";
import { useEffect, useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faFilter,faCalendarDays,faClock,faMapPin,faHouseUser,faThumbTack,faUserNinja } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as FilterIcon } from '../../assets/filtericon.svg';
import { ReactComponent as SettingsIcon } from '../../assets/settingsicon.svg';
import { ReactComponent as NavCard } from '../../assets/navcard.svg';
import "./home.css";

const Home = () => {
  const { user } = useContext(AuthContext);
    return (
      <div className="home">
        <div className="home-header">
          <h2>Hi, {user.username} </h2>
          <span className="home-location"> {user.locationName} </span> {/*this has to be fetched first from the db TODO*/}
          <SettingsIcon />
        </div>
        <div className="home-searchbar-wrapper">
          <div className="home-search-field">
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:"#888888"}}/>
            <input className="home-search-input" placeholder="Search..."></input>
          </div>
          <FontAwesomeIcon icon={faFilter} className="home-filter" />
          <FilterIcon style={{ fill: "blue" }}/>
        </div>
        <div className="home-categories-wrapper">
          <div className="home-categories-header">
            <h2>Categories</h2>
            <span className="home-categories-show">Show all</span>
          </div>
          <div className="home-categories-field">
            <div className="category"></div><div className="category"></div><div className="category"></div><div className="category"></div><div className="category"></div>
            {/*this will most likely be a mapping or a component */}
          </div>
        </div>
        <div className="home-main">
          <div className="home-trending">
            {/*this will most likely be a mapping or a component */}
            <div className="event-wrapper">
              <img className="event-picture"></img>
              <div className="event-content-grid">
                <div className="event-content-datetime">
                  <FontAwesomeIcon icon={faCalendarDays} /><span className="event-date"></span>
                  <FontAwesomeIcon icon={faClock} /><span className="event-time"></span> 
                </div>
                <FontAwesomeIcon icon={faThumbTack} /> <span className="event-content-location"></span>
                <div className="event-coming">

                </div>
                <button className="event-interested-button"> Interested</button>
              </div>
            </div>
          </div>
          <div className="home-upcoming">
            {/*this will most likely be a mapping or a component */}
            <div className="event-wrapper"></div>
          </div>
        </div>
        <div className="home-nav">
          {/*<NavCard className="nav-card"/>*/}
          <button className="nav-create-button">
            +
          </button>
          <div className="nav-icons-container">
          <FontAwesomeIcon icon={faHouseUser} />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <FontAwesomeIcon icon={faMapPin} />
          <FontAwesomeIcon icon={faUserNinja} />
          </div>
        </div>
      </div>
    )
  }
  
export default Home