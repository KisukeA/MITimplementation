import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import "./login.css";

const Login = () => {
    const { login,setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error,setError] = useState(null);
    const [credentials, updateCredentials] = useState({
        username: "",
        password: ""
    });
    const sendCred = async (e) => {  
        e.preventDefault();
        if(credentials.username.length === 0 || credentials.password.length === 0){
            setError("Please fill all the fields");
            return;
        }
        try{
            const a = await login(credentials);
            navigate('/');
        }
        catch(err){
            setError(err.response?.data);
           }
    }
    const updateCred = (e) => {
        updateCredentials((previous)=>({...previous, [e.target.name]: e.target.value}));
    }
    useEffect(() => {
        // Only set up a timer if there's an error
        if (error) {
            const timer = setTimeout(() => {
                setError(''); // Clear the error message
            }, 3000); // Set timeout for 5 seconds
    
            // Cleanup function to clear the timer
            return () => clearTimeout(timer);
        }
    }, [error]);
    const handleClick = (req,res) => {
        // Your custom logic here
        setUser({id:0, username:"guest","profilePicture": null, role: "guest"})
      };
    console.log(credentials);
    return (
        <div className="login-wrapper">
            <div className = "blur"></div>
            <div className="login-content">
                <div className="eventopia-logo">Eventopia
                    <svg width="min(4.2vh,45px)" height="min(4.2vh,45px)" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M49.4999 54.15C49.4999 48.8757 45.2242 44.6 39.9499 44.6C34.6756 44.6 30.3999 48.8757 30.3999 54.15C30.3999 59.4243 34.6756 63.7 39.9499 63.7C45.2242 63.7 49.4999 59.4243 49.4999 54.15Z" fill="white"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M49.0781 39.4217C44.0404 34.3839 44.0404 26.2161 49.0781 21.1783C54.1159 16.1406 62.2837 16.1406 67.3215 21.1783C72.3592 26.2161 72.3592 34.3839 67.3215 39.4217L58.1998 48.5434L49.0781 39.4217Z" fill="white"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.6782 39.4217C7.64046 34.3839 7.64046 26.2161 12.6782 21.1783C17.716 16.1406 25.8838 16.1406 30.9216 21.1783C35.9593 26.2161 35.9593 34.3839 30.9216 39.4217L21.7999 48.5434L12.6782 39.4217Z" fill="white"/>
                    </svg>
                </div>
                <div className="login-form">
                   <h2>Welcome back!</h2>
                   <form>
                       <div className="form-element">
                           <label className="login-label" htmlFor="login-username">Username:</label>
                           <input onChange = {updateCred} type="text" id="login-username" className="login-input" 
                               name="username" placeholder="Username..."></input>
                       </div>
                       <div className="form-element">
                           <label className="login-label" htmlFor="login-password">Password:</label>
                           <input onChange = {updateCred} type="password" id="login-password" className="login-input"
                               name="password" placeholder="Password..."></input>
                       </div>
                   </form>
                    {error &&<p className="login-error">{error}</p>}
                    <div>
                        <button onClick={sendCred} className = "login-submit" >Log in</button>
                        <h4 className = "or-text">OR</h4>
                        <Link className = "login-google" /*</div>onClick={handleClick} to ="/profile/0"*/ > <FontAwesomeIcon icon={faGoogle} /><span>Continue with Google</span></Link>
                    </div>
                    <span>Don't have an account? <Link to ="/register">Sign up</Link></span>
                </div>
            </div>
        </div>
        )
}

export default Login
