import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faMapPin,faHouseUser,faUserNinja } from '@fortawesome/free-solid-svg-icons';
import CreateEvent from "../../components/CreateEvent/CreateEvent.js";
import { ReactComponent as NavCard } from '../../assets/navcard.svg';
import "./Nav.css";

const About = () => {
    
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

    return (<>
        <div className="nav">
            <NavCard className="nav-card"/>
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
        </>
    )
  }
  
export default About