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
        <button ><FontAwesomeIcon icon={faArrowLeft} /></button>
        <br></br>
        <span>{result.username?"user":"event"}</span>
        {result.username?
            <Link to={`/userprofile/${result.id}`}>
                <button>{result.username}</button>
            </Link>
        :   
            <Link to={`/singleevent/${result.id}`}>
                <button>{result.title}</button>
            </Link>
        }
        <button>pay</button>
      </div>
    )
  }
export default Result