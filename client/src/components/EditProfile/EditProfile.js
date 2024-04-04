import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext.js";
import { faArrowLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { makeRequest } from "../../axios.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./EditProfile.css";

const EditProfile = ({setOpenEditProfile}) => {

    const { user } = useContext(AuthContext);
    const [closing, setClosing] = useState(false);
    const [ openDropdown, setOpenDropdown ] = useState("");
    const [success, setSuccess] = useState(false);

    const { isLoading:uLoading, error:uError, data:profileData } = useQuery({
      queryKey: ["profile"], 
      queryFn: () => {
      return makeRequest.get(`/user/${user.id}`).then((res)=>{
        return res.data;
      })}
    });
    const [ updateData,setUpdateData ] = useState({
      profile_pic:profileData?.profile_pic,
      profession:profileData?.profession,
      bio:profileData?.bio,
      email:profileData?.email
    })
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: (user) => {
        return makeRequest.put("/user", user);
      },
      onSuccess: () => {
        setOpenDropdown("");
        setSuccess(true);
        queryClient.invalidateQueries(["profile"]);
      },
    });
    useEffect(() => {
      if (closing) {
        const timer = setTimeout(() => {
          setOpenEditProfile(false);
          setClosing(false);
        }, 400);//don't change number, corresponds to animation duration
        return () => clearTimeout(timer);
      }
      }, [closing]);
      useEffect(() => {
        if (success) {
          const timer = setTimeout(() => {
            setSuccess(false); 
          }, 3000); 
          return () => clearTimeout(timer);
        }
    }, [success]);
    const handleChange = (e) => {
        setUpdateData(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    const submitChanges = () => {
      if(updateData.bio===profileData?.bio
      && updateData.profession===profileData?.profession
      && updateData.profile_pic===profileData?.profile_pic
      && updateData.email===profileData?.email) {return};
      console.log("sdadsfa")
      mutation.mutate(updateData);
    }
    return (
      <div className={`editprofile ${closing?'closing-ep':''}`}>
        <FontAwesomeIcon icon={faArrowLeft} onClick={()=>{setClosing(true)}} className="ep-back-icon"/>
        <h1>UPDATE</h1>
        <div className="ep-inputs">
          <div className="ep-input">
            <div className={`ep-input-header`}>
                <span>Profile picture</span>
                <FontAwesomeIcon className={`${openDropdown==="pp"?'rotating':''}`}
                icon={faChevronRight} onClick={()=>{setOpenDropdown(prev=>prev!=="pp"?"pp":"")}} />
            </div>
            {<div className={`ep-dropdown ${openDropdown==="pp"?'opening':'closing'} pp`}>
                <input type="file" onChange={handleChange}></input>
            </div>}
          </div>
          <div className="ep-input">
            <div className="ep-input-header">
                <span>Profession</span>
                <FontAwesomeIcon className={`${openDropdown==="pro"?'rotating':''}`}
                icon={faChevronRight} onClick={()=>{setOpenDropdown(prev=>prev!=="pro"?"pro":"")}}/>
            </div>
            {<div className={`ep-dropdown ${openDropdown==="pro"?'opening':'closing'} pro`}>
                <input type="text" value = {updateData.profession} name = "profession" onChange={handleChange}></input>
            </div>}
          </div>
          <div className="ep-input">
            <div className="ep-input-header">
                <span>Bio</span>
                <FontAwesomeIcon className={`${openDropdown==="bio"?'rotating':''}`}
                icon={faChevronRight} onClick={()=>{setOpenDropdown(prev=>prev!=="bio"?"bio":"")}}/>
            </div>
            {<div className={`ep-dropdown ${openDropdown==="bio"?'opening':'closing'} bio`}>
                <textarea value = {updateData.bio} name = "bio" onChange={handleChange}></textarea>
            </div>}
          </div>
          <div className="ep-input">
            <div className="ep-input-header">
                <span>Email</span>
                <FontAwesomeIcon className={`${openDropdown==="email"?'rotating':''}`}
                icon={faChevronRight} onClick={()=>{setOpenDropdown(prev=>prev!=="email"?"email":"")}}/>
            </div>
            {<div className={`ep-dropdown ${openDropdown==="email"?'opening':'closing'} email`}>
                <input type="email" value = {updateData.email} name = "email" onChange={handleChange} required></input>
            </div>}
          </div>
        </div>
        <button className = "update-button" onClick={submitChanges}> Save changes</button>
        {success && <span className="ep-success">Succesfuly updated!</span>}
      </div>
    )
  }
  
export default EditProfile