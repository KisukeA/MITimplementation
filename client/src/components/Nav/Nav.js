import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faMapPin,faHouseUser,faUserNinja,faTicket } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "../../context/AuthContext.js";
import CreateEvent from "../../components/CreateEvent/CreateEvent.js";
import { ReactComponent as NavCard } from '../../assets/navcard.svg';
import "./Nav.css";

const Nav = ({setSearchOpen, homePage}) => {
    
    const [ createEventOpen, setCreateEvenOpen ] = useState(false);
    const [ closing, setClosing ] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
      if (closing) {
          const timer = setTimeout(() => {
              setCreateEvenOpen(false);
              setClosing(false);
          }, 500);//don't change number, corresponds to animation duration
          return () => clearTimeout(timer);
      }
    }, [closing]);
    const smoothScroll = (e) =>{
      e.preventDefault(); // Prevent the default anchor link behavior
    
      const container = document.getElementById('tickets-container');
      const target = document.getElementById('tickets');
    
      if (container && target) {
        container.scrollTo({
          top: target.offsetTop - container.offsetTop, // Adjust if you have additional offsets
          behavior: 'smooth'
        });
      }
    }
    return (<>
        <div className="nav">
            <NavCard className="nav-card"/>
            <div className = "cutout"></div>
            <button className="nav-create-button" onClick={()=>{setCreateEvenOpen(true)}}>
              +
            </button>
            <div className="nav-icons-container">
              <div>
                <Link to={`/`} style={{ textDecoration: "none", color:"inherit"}}>
                  <FontAwesomeIcon className="nav-icon" icon={faHouseUser} />
                </Link>
                {/* done, changed <3 */}
                {!homePage?
                  // <Link style={{ textDecoration: "none", color:"inherit"}}>
                  //   <FontAwesomeIcon icon={faTicket} />
                  // </Link>
                  <a href = "#tickets" onClick={smoothScroll} style={{ textDecoration: "none", color:"inherit"}}>
                    <FontAwesomeIcon className="nav-icon" icon={faTicket} />
                  </a>:
                  <Link to={`/`} style={{ textDecoration: "none", color:"inherit"}}>
                    <label htmlFor="search-input" onClick={()=>setSearchOpen(prev=>!prev)}><FontAwesomeIcon className="nav-icon" icon={faMagnifyingGlass} /></label>
                  </Link>
                }
              </div>
              <div>
                <Link to={`/`} style={{ textDecoration: "none", color:"inherit"}}>
                  <FontAwesomeIcon className="nav-icon" icon={faMapPin} />
                </Link>
                <Link to={`/profile/${user.id}`} style={{ textDecoration: "none", color:"inherit"}}>
                  <FontAwesomeIcon className="nav-icon" icon={faUserNinja} />
                </Link>
                </div>
            </div>
        </div>
        {createEventOpen && <CreateEvent closing={closing} setClosing={setClosing}/>}
        </>
    )
  }
  
export default Nav