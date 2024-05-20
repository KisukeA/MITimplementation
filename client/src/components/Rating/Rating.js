import { Link, useParams, useNavigate} from 'react-router-dom';
import { React, useState, useContext, useRef, useEffect } from "react";
import { makeRequest } from "../../axios.js";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Star } from '../../assets/star.svg';
import "./Rating.css";
const Rating = ({eventRated, setOpenRating}) => {

  const [ attended, setAttended ] = useState(false);
  const [ review, setReview ] = useState("");
  const [ rating, setRating ] = useState(null);
  const [ error, setError ] = useState(null)
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: (ticket) => {
        return makeRequest.put('/ticket', ticket);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["singleevent",eventRated.id]);
        setOpenRating(false);
      },
    });
    useEffect(() => {
      if (error) {
          const timer = setTimeout(() => {
              setError(null);
          }, 2500); 
          return () => clearTimeout(timer);
      }
  }, [error]);
    const changeColor = (n) =>  {
      for (let i = 1; i <= 5; i++) {
        document.getElementById("star"+i).style.fill = i<=n?'rgb(255, 243, 20)':'black';
      }
    }
    const handleReview = () => {
      if(!attended) mutation.mutate({rating: null, review:null, didGo:0, id:eventRated.id})
      if(attended && rating===null){
        setError("Please select a rating first");
        return;
      }
      mutation.mutate({rating: rating, review:review, didGo:attended, id:eventRated.id})
    }
    return (
      <div className="rating">
        <button className='rating-back' onClick={()=>{setOpenRating(false)}}><FontAwesomeIcon icon={faArrowLeft} /></button>
        <form className='rating-form'>
          <span>Did you even party?</span>
          <div className='rating-radio-container'>
            <div>
              <input onChange={(e)=>{setAttended(true)}} id = "radioYes" type="radio" name='event-attendance' value={true}></input>
              <label htmlFor='radioYes'>I did</label>
            </div>
            <div>
              <input onChange={(e)=>{setAttended(false)}} id = "radioNo" type="radio" name='event-attendance' value={false}></input>
              <label htmlFor='radioNo'>I didn't</label>
            </div>
          </div>
          {attended && <div>
            <Star id = "star1" onClick = {()=>{changeColor(1);setRating(1)}} />
            <Star id = "star2" onClick = {()=>{changeColor(2);setRating(2)}} />
            <Star id = "star3" onClick = {()=>{changeColor(3);setRating(3)}} />
            <Star id = "star4" onClick = {()=>{changeColor(4);setRating(4)}} />
            <Star id = "star5" onClick = {()=>{changeColor(5);setRating(5)}} />
            {error && <span style={{color:'red', display:"block"}}>{error}</span>}
            <label htmlFor='review'>Leave a review (optional)</label>
            <input id="review" type='text' onChange={(e)=>{setReview(e.target.value)}} value = {review}>
            </input>
          </div>}
        </form>
        <button className='rating-btn' onClick={handleReview}>Submit</button>
      </div>
    )
  }
  
export default Rating