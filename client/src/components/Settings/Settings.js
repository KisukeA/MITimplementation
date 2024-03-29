import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import { makeRequest } from "../../axios.js";
import "./Settings.css";

const Settings = ({settingsRef, setSettingsOpen, settingsOpen}) => {

    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClickOutside = (event) => {
        if (settingsRef.current && !settingsRef.current.contains(event.target)) {
            setSettingsOpen(false);
        }
      };
    useEffect(() => {
        if (settingsOpen) {
            document.addEventListener('click', handleClickOutside, true);
        }
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
    }, [settingsOpen]);
    const logout = async () => {
      const r = await makeRequest.post("/auth/logout",{},{withCredentials:true});
      setUser(null);
      navigate("/login");
    }
    const saveChanges = ()=>{
      setSettingsOpen(false);
    }
    return (
      <div className="settings" ref={settingsRef}>
        <h1>Settings</h1>
        <div className="settings-content">
            <span className="setting"></span>
            <span className="setting"></span>
            <span className="setting"></span>
            <span className="setting"></span>
            <span onClick = {logout} className="setting">Log out</span>
            <button className="settings-button" onClick={saveChanges}>Save</button>
        </div>
      </div>
    )
  }
  
export default Settings