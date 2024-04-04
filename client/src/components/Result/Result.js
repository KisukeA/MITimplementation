import { Link, useParams, useNavigate} from 'react-router-dom';
import { React, useState, useContext, useRef, useEffect } from "react";
import { makeRequest } from "../../axios.js";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "./Result.css";
const Result = ({result}) => {
    return (
      <div className="result">
        {result.email?
            <div>
              <img src={`${result.profile_picture}`}></img>
              <Link to={`/userprofile/${result.id}`}>
                <span>{result.username}</span>
              </Link>
              <span>{result.role}</span>
              <span>{result.email}</span>
            </div>
        :   
          <div>
            <span>{result.title}</span>
            <Link to={`/singleevent/${result.id}`}>
                <button>Open event</button>
            </Link>
            <span>price: {result.price} </span>
            <span>{new Date(result.datetime).toLocaleString('en-UK', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            creator: 
            <Link to={`/userprofile/${result.creator_id}`}>
              <span> {result.username}</span>
            </Link>
          </div>
        }
        
      </div>
    )
  }
export default Result