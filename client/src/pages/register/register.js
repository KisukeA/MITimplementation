import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faMars ,faVenus } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import "./register.css";


const Register = () => {
  const [success, setSuccess] = useState(false);
  const [chooseRole, setChooseRole] = useState(false);
  const [red,setRed] = useState(false); //change the color of the sign in button
  //when all inputs are filled
  const [error,setError] = useState(null);
  const [cred, setCred] = useState({
      username: "",
      password: "",
      confirm: "",
      role:"",
      gender:"",
      age:''
  })
  const chooseRef = useRef();
  const updateCred = (e) =>{
      setCred((previous)=>({...previous,[e.target.name]:e.target.value}));
      setSuccess(false);
  }
  const sendRegister = async (e) => {
      e.preventDefault();
      if( cred.age.length === 0 || cred.gender.length === 0 || cred.username.length === 0 || cred.confirm.length === 0 || cred.password.length === 0 || cred.role.length === 0){
          setError("Please fill all the fields");
          return;
      }
      try{
          const a = await axios.post("http://88.200.63.148:8068/server/auth/register", cred);
          setCred({
            username: "",
            password: "",
            confirm: "",
            role:"",
            gender:"",
            age:''
        })
          setSuccess(true);
      }
      catch(err){
          setError(err.response.data);
      }
  }
  useEffect(() => {
    // Only set up a timer if there's an error
    if (error) {
        const timer = setTimeout(() => {
            setError(''); // Clear the error message
        }, 3000); // Set timeout for 3 seconds

        // Cleanup function to clear the timer
        return () => clearTimeout(timer);
    }
  }, [error]);
  useEffect(()=>{
    if( cred.age.length === 0 || cred.gender.length === 0 || cred.username.length === 0 || cred.confirm.length === 0 || cred.password.length === 0 || cred.role.length === 0){
      setRed(false);
      return;
    }
    setRed(true);
  },[cred])
  const handleClickOutside = (event) => {
    if (chooseRef.current && !chooseRef.current.contains(event.target)) {
        setChooseRole(false);
    }
  };
  useEffect(() => {
    if (chooseRole) {
        document.addEventListener('click', handleClickOutside, true);
    }});
  return (
    <div className="register-wrapper">
      <div className = "blur"></div>
      <div className="register-content">
        <div className="eventopia-logo">Eventopia
          <svg width="min(4.2vh,45px)" height="min(4.2vh,45px)" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M49.4999 54.15C49.4999 48.8757 45.2242 44.6 39.9499 44.6C34.6756 44.6 30.3999 48.8757 30.3999 54.15C30.3999 59.4243 34.6756 63.7 39.9499 63.7C45.2242 63.7 49.4999 59.4243 49.4999 54.15Z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M49.0781 39.4217C44.0404 34.3839 44.0404 26.2161 49.0781 21.1783C54.1159 16.1406 62.2837 16.1406 67.3215 21.1783C72.3592 26.2161 72.3592 34.3839 67.3215 39.4217L58.1998 48.5434L49.0781 39.4217Z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M12.6782 39.4217C7.64046 34.3839 7.64046 26.2161 12.6782 21.1783C17.716 16.1406 25.8838 16.1406 30.9216 21.1783C35.9593 26.2161 35.9593 34.3839 30.9216 39.4217L21.7999 48.5434L12.6782 39.4217Z" fill="white"/>
          </svg>
        </div>
        <div className="register-form">
          <h2>Join the party!</h2>
          <form>
            <div className="form-element">
              <label className="register-label" htmlFor="register-username">Username:</label>
              <input onChange = {updateCred} type="text" id="register-username" className="register-input" 
                  name="username" placeholder="Username..." value={cred.username}></input>
            </div>
            <div className="form-element">
              <label className="register-label" htmlFor="register-password">Password:</label>
              <input onChange = {updateCred} type="password" id="register-password" className="register-input"
                  name="password" placeholder="Password..." value={cred.password}></input>
            </div>
            <div className="form-element">
              <label className="register-label" htmlFor="register-confirm">Confirm password:</label>
              <input onChange = {updateCred} type="password" id="register-confirm" className="register-input"
                  name="confirm" placeholder="Confirm password..." value={cred.confirm}></input>
            </div>
            <div className="register-gender-age">
              <div className="register-gender">
                <FontAwesomeIcon onClick={()=>{setCred((prev)=>({...prev,gender:"female"}))}} icon={faVenus} className = {`register-female ${cred.gender==="female"?'highlight':''}`} />
                <FontAwesomeIcon onClick={()=>{setCred((prev)=>({...prev,gender:"male"}))}} icon={faMars} className = {`register-male ${cred.gender==="male"?'highlight':''}`} />
              </div>
              <div className="register-age">
                <label htmlFor="register-age">Age:</label>
                <input type="number" name="age" onChange={updateCred} value={cred.age} id="register-age" className="register-age-input"></input>
              </div>
            </div>  
          </form>
          
          <button className = "register-role" onClick={()=>setChooseRole(true)}>
            Choose role
          </button>
          {error && <p className="register-error">{error}</p>}
          <div>
            <button onClick={sendRegister} className = {`register-submit ${red?'red':''}`} >Sign in</button>
            <h4 className = "or-text">OR</h4>
            <Link className = "register-google" /*</div>onClick={handleClick} to ="/profile/0"*/ > <FontAwesomeIcon icon={faGoogle} /><span>Continue with Google</span></Link>
          </div>
          <span>Already a member? <Link to ="/login">Log in</Link></span>
          {success && <span className="register-success">Successfully created an account <Link to = "/login">Log in</Link></span>}
        </div>
      </div>
      {chooseRole &&
        <div className="register-choose" ref={chooseRef}>
          <button className = "register-role-button" name="role" 
            onClick = {(e)=>{setChooseRole(false);updateCred(e)}} value="partygoer">User</button>
          <button className = "register-role-button" name="role" 
            onClick = {(e)=>{setChooseRole(false);updateCred(e)}} value="creator">Creator</button>
          <span>Current role: {cred.role?cred.role:'none'}</span>
        </div>
      }
    </div>
  )
      
}

export default Register


