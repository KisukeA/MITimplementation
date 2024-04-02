import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js" ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as FilterIcon } from '../../assets/filtericon.svg';
import Filters from "../../components/Filters/Filters.js";
import Result from "../../components/Result/Result.js";
import "./Search.css";

const Search = ({setSearchOpen, searchOpen}) => {
    
    const [ filtersOpen, setFiltersOpen ] = useState(false);
    const filtersRef = useRef();
    const [openSearchOverlay,setOpenSearchOverlay] = useState(false);
    const overlayRef = useRef();
    const [searchData, setSearchData] = useState({
      search: "",
      generalFilter:"",
      filter:""
    });
    const handleClickOutside = (event) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
          setOpenSearchOverlay(false);
      }
    };
    useEffect(() => {
        if (openSearchOverlay) {
            document.addEventListener('click', handleClickOutside, true);
        }
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
    }, [openSearchOverlay]);
    const { isLoading, error, data:searched } = useQuery({
      queryKey: ["searched", searchData],
      enabled: (!!searchData.search && !!searchData.filter && !!searchData.generalFilter), 
      queryFn: () => {
      return makeRequest.get(`/${searchData.generalFilter==="users"?"user":"event"}/search?keyword=${searchData.search}&filter=${searchData.filter}`).then((res)=>{
        return res.data;
      })}
    });
    console.log(searchData);
    console.log(searched)
    return (
        <div className="searchbar-wrapper" ref={overlayRef}>
            <div className="search-field">
              <FontAwesomeIcon onClick={()=>{setOpenSearchOverlay(true)}} icon={faMagnifyingGlass} style={{color:"#888888", cursor:"pointer"}}/>
              <input className="search-input" id="search-input" value={searchData.search} onChange={(e)=>{setSearchData(prev=>({...prev, search:e.target.value}))}} placeholder="Search..."></input>
            </div>
            <FilterIcon style={{ cursor:"pointer" }} onClick={()=>{setFiltersOpen(true)}}/>
            {filtersOpen && <Filters searchData = {searchData}  setSearchData={setSearchData} filtersRef={filtersRef} filtersOpen = {filtersOpen} setFiltersOpen={setFiltersOpen} /> }
            {openSearchOverlay && <div className="search-overlay">
              {
                isLoading? "searching":
                error? "error":
                searched?.length === 0? "no results":
                <>{searched?.map((result)=>(<Result key={result.id} result={result}/>))}</>
              }
            </div>}
        </div>
    )
  }
  
export default Search