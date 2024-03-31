import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as FilterIcon } from '../../assets/filtericon.svg';
import Filters from "../../components/Filters/Filters.js";
import "./Search.css";

const Search = ({setSearchOpen, searchOpen, searchRef}) => {
    
    const [ filtersOpen, setFiltersOpen ] = useState(false);
    const filtersRef = useRef();
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
          setSearchOpen(false);
        }
      };
    useEffect(() => {
        if (searchOpen) {
            document.addEventListener('click', handleClickOutside, true);
        }
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
    }, [searchOpen]);
    const saveChanges = ()=>{
        setFiltersOpen(false);
    }
    return (
        <div className="searchbar-wrapper" ref={searchRef}>
            <div className="search-field">
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:"#888888", cursor:"pointer"}}/>
              <input className="search-input" id="search-input" placeholder="Search..."></input>
            </div>
            <FilterIcon style={{ cursor:"pointer" }} onClick={()=>{setFiltersOpen(true)}}/>
            {filtersOpen && <Filters filtersRef={filtersRef} filtersOpen = {filtersOpen} setFiltersOpen={setFiltersOpen} /> }
        </div>
    )
  }
  
export default Search