import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "./ProfileSettings.css";

const ProfileSettings = ({setOpenProfileSettings}) => {

    const [closing, setClosing] = useState(false);

    useEffect(() => {
        if (closing) {
            const timer = setTimeout(() => {
                setOpenProfileSettings(false);
                setClosing(false);
            }, 400);//don't change number, corresponds to animation duration
            return () => clearTimeout(timer);
        }
      }, [closing]);

    return (
      <div className={`profilesettings ${closing?'closing-ps':''}`}>
        <FontAwesomeIcon icon={faArrowLeft} onClick={()=>{setClosing(true)}} className="ps-back-icon"/>
        <h1>PROFILE</h1>
        <div className="ps-settings">
          <div className="ps-setting">
            <span>My account</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
          <div className="ps-setting">
            <span>Setting</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
          <div className="ps-setting">
            <span>Setting</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
        <div className="ps-options">
          <div className="ps-option">
            <span>Show events on profile</span>
            <input type="checkbox"></input>
          </div>
          <div className="ps-option">
            <span>Show interested on profile</span>
            <input type="checkbox"></input>
          </div>
        </div>
      </div>
    )
  }
  
export default ProfileSettings