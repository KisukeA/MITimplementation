import { Link } from "react-router-dom";
import { useEffect, useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faFilter,faCalendarDays,faClock,faMapPin,faHouseUser,faThumbTack,faUserNinja } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as FilterIcon } from '../../assets/filtericon.svg';
import { ReactComponent as SettingsIcon } from '../../assets/settingsicon.svg';
import { ReactComponent as Nav } from '../../assets/navcard.svg';
import CreateEvent from "../../components/CreateEvent/CreateEvent.js";
import "./home.css";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [ createEventOpen, setCreateEvenOpen ] = useState(false);
  const [ closing, setClosing ] = useState(false);
  useEffect(() => {
    if (closing) {
        const timer = setTimeout(() => {
            setCreateEvenOpen(false);
            setClosing(false);
        }, 500);//don't change number, corresponds to animation duration
        return () => clearTimeout(timer);
    }
  }, [closing]);
    return (
      <div className="home">
        <div className="home-header">
          <div className="home-header-content">
            <h2>Hi, {user.username} </h2>
            <span className="home-location"> {user.locationName} ddd</span> {/*this has to be fetched first from the db TODO*/}
          </div>
          <SettingsIcon className="home-header-icon"/>
        </div>
        <div className="home-searchbar-wrapper">
          <div className="home-search-field">
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:"#888888", cursor:"pointer"}}/>
            <input className="home-search-input" placeholder="Search..."></input>
          </div>
          {/*<FontAwesomeIcon visibility = "hidden" icon={faFilter} className="home-filter" />*/}
          <FilterIcon style={{ cursor:"pointer" }}/>
        </div>
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
              
              <div className="event">
                <img className="event-picture"></img>
                <div className="event-content">
                  <div className="event-content-datetime">
                    <div>
                      <FontAwesomeIcon icon={faCalendarDays} /><span className="event-date"> 09 May 24</span>
                      </div>
                    <div>
                      <FontAwesomeIcon icon={faClock} /><span className="event-time"> 22:00</span> 
                    </div>
                  </div>
                  <div className="event-content-location">
                    <FontAwesomeIcon icon={faThumbTack} /> <span> Piran, Slovenia</span>
                  </div>
                  <div className="event-interact">
                    <div className="event-coming">
                      <div className="placeholder-img"></div>
                      <div className="placeholder-img"></div>
                      <div className="placeholder-img"></div>
                      <div className="placeholder-img"></div>
                      <div className="placeholder-img"></div>
                    </div>
                    <Link to={`/singleevent/1`} style={{ textDecoration: "none", color:"inherit"}}>
                      <button className="event-interested-button">Want to go</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="event">
                <img className="event-picture"></img>
                <div className="event-content">
                  <div className="event-content-datetime">
                    <div>
                      <FontAwesomeIcon icon={faCalendarDays} /><span className="event-date"> 09 May 24</span>
                      </div>
                    <div>
                      <FontAwesomeIcon icon={faClock} /><span className="event-time"> 22:00</span> 
                    </div>
                  </div>
                  <div className="event-content-location">
                    <FontAwesomeIcon icon={faThumbTack} /> <span> Piran, Slovenia</span>
                  </div>
                  <div className="event-interact">
                    <div className="event-coming">
                      <div className="placeholder-img"></div>
                      <div className="placeholder-img"></div>
                      <div className="placeholder-img"></div>
                      <div className="placeholder-img"></div>
                      <div className="placeholder-img"></div>
                    </div>
                    <button className="event-interested-button">Want to go</button>
                  </div>
                </div>
              </div>
              <div className="event">
                <img className="event-picture"></img>
                <div className="event-content">
                  <div className="event-content-datetime">
                    <div>
                      <FontAwesomeIcon icon={faCalendarDays} /><span className="event-date"> 09 May 24</span>
                      </div>
                    <div>
                      <FontAwesomeIcon icon={faClock} /><span className="event-time"> 22:00</span> 
                    </div>
                  </div>
                  <div className="event-content-location">
                    <FontAwesomeIcon icon={faThumbTack} /> <span> Piran, Slovenia</span>
                  </div>
                  <div className="event-interact">
                    <div className="event-coming">
                      <div className="placeholder-img"></div>
                      <div className="placeholder-img"></div>
                      <div className="placeholder-img"></div>
                      <div className="placeholder-img"></div>
                      <div className="placeholder-img"></div>
                    </div>
                    <button className="event-interested-button">Want to go</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home-upcoming">
            <h2 className="home-upcoming-header">Upcoming events</h2>
            {/*this will most likely be a mapping or a component */}
            <div className="events-wrapper">
              {/*this will most likely be a mapping or a component */}
              <div className="event">
                <img className="event-picture"></img>
                <div className="event-content">
                  <div className="event-content-datetime">
                    <div>
                      <FontAwesomeIcon icon={faCalendarDays} /><span className="event-date"> 09 May 24</span>
                      </div>
                    <div>
                      <FontAwesomeIcon icon={faClock} /><span className="event-time"> 22:00</span> 
                    </div>
                  </div>
                  <div className="event-content-location">
                    <FontAwesomeIcon icon={faThumbTack} /> <span> Piran, Slovenia</span>
                  </div>
                  <div className="event-interact">
                    <div className="event-coming">
                      <div className="placeholder-img"></div>
                      <div className="placeholder-img"></div>
                      <div className="placeholder-img"></div>
                      <div className="placeholder-img"></div>
                      <div className="placeholder-img"></div>
                    </div>
                    <button className="event-interested-button">Want to go</button>
                  </div>
                </div>
              </div>
              <div className="event">
                <img className="event-picture"></img>
                <div className="event-content">
                  <div className="event-content-datetime">
                    <div>
                      <FontAwesomeIcon icon={faCalendarDays} /><span className="event-date"> 09 May 24</span>
                      </div>
                    <div>
                      <FontAwesomeIcon icon={faClock} /><span className="event-time"> 22:00</span> 
                    </div>
                  </div>
                  <div className="event-content-location">
                    <FontAwesomeIcon icon={faThumbTack} /> <span> Piran, Slovenia</span>
                  </div>
                  <div className="event-interact">
                    <div className="event-coming">
                      <div className="placeholder-img"></div>
                      <div className="placeholder-img"></div>
                      <div className="placeholder-img"></div>
                      <div className="placeholder-img"></div>
                      <div className="placeholder-img"></div>
                    </div>
                    <button className="event-interested-button">Want to go</button>
                  </div>
                </div>
              </div>
              <div className="event">
                <img className="event-picture"></img>
                <div className="event-content">
                  <div className="event-content-datetime">
                    <div>
                      <FontAwesomeIcon icon={faCalendarDays} /><span className="event-date"> 09 May 24</span>
                      </div>
                    <div>
                      <FontAwesomeIcon icon={faClock} /><span className="event-time"> 22:00</span> 
                    </div>
                  </div>
                  <div className="event-content-location">
                    <FontAwesomeIcon icon={faThumbTack} /> <span> Piran, Slovenia</span>
                  </div>
                  <div className="event-interact">
                    <div className="event-coming">
                      <div className="placeholder-img"></div>
                      <div className="placeholder-img"></div>
                      <div className="placeholder-img"></div>
                      <div className="placeholder-img"></div>
                      <div className="placeholder-img"></div>
                    </div>
                    <button className="event-interested-button">Want to go</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-nav">
          < Nav className="nav-card"/>
          <div className = "cutout"></div>
          <button className="nav-create-button" onClick={()=>{setCreateEvenOpen(true)}}>
            +
          </button>
          <div className="nav-icons-container">
            <div>
              <FontAwesomeIcon className="nav-icon" icon={faHouseUser} />
              <FontAwesomeIcon className="nav-icon" icon={faMagnifyingGlass} />
            </div>
            <div>
              <FontAwesomeIcon className="nav-icon" icon={faMapPin} />
              <FontAwesomeIcon className="nav-icon" icon={faUserNinja} />
              </div>
          </div>
        </div>
        {createEventOpen && <CreateEvent closing={closing} setClosing={setClosing}/>}
        
      </div>
    )
  }
  
export default Home