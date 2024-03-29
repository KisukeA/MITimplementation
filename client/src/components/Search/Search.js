import {  useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as FilterIcon } from '../../assets/filtericon.svg';
import Filters from "../../components/Filters/Filters.js";
import "./Search.css";

const About = () => {
    
    const [ filtersOpen, setFiltersOpen ] = useState(false);
    
    const filtersRef = useRef();
    return (
        <div className="searchbar-wrapper">
            <div className="search-field">
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:"#888888", cursor:"pointer"}}/>
              <input className="search-input" placeholder="Search..."></input>
            </div>
            <FilterIcon style={{ cursor:"pointer" }} onClick={()=>{setFiltersOpen(true)}}/>
            {filtersOpen && <Filters filtersRef={filtersRef} filtersOpen = {filtersOpen} setFiltersOpen={setFiltersOpen} /> }
        </div>
    )
  }
  
export default About