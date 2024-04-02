import { useEffect, useContext, useState } from "react";
import "./FilterStyles.css";

const Filters = ({filtersRef,filtersOpen, setFiltersOpen, searchData, setSearchData}) => {

    const handleClickOutside = (event) => {
        if (filtersRef.current && !filtersRef.current.contains(event.target)) {
            setFiltersOpen(false);
        }
      };
    useEffect(() => {
        if (filtersOpen) {
            document.addEventListener('click', handleClickOutside, true);
        }
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
    }, [filtersOpen]);
    const saveChanges = ()=>{
        setFiltersOpen(false);
    }
    return (
        <div className="filters" ref={filtersRef}>
            <h1>Filters</h1>
            <div className="filters-content">
                <div className = "filters-general">
                    {searchData.generalFilter!=="users" && <span onClick={()=>setSearchData(prev=>({...prev,generalFilter:"users",filter:""}))}>{searchData.generalFilter!==""?'<':''}Users</span>}
                    {searchData.generalFilter!=="events" && <span onClick={()=>setSearchData(prev=>({...prev,generalFilter:"events",filter:""}))}>Events{searchData.generalFilter!==""?'>':''}</span>}
                </div>
                {searchData.generalFilter === "users" ?
                    <>
                        <span className={`filter ${searchData.filter==="username"?'current-filter':''}`} onClick={()=>setSearchData(prev=>({...prev,filter:"username"}))}>Username</span>
                        <span className={`filter ${searchData.filter==="email"?'current-filter':''}`} onClick={()=>setSearchData(prev=>({...prev,filter:"email"}))}>Email</span>
                    </>
                    : searchData.generalFilter === "events" ?
                    <>
                        <span className={`filter ${searchData.filter==="category"?'current-filter':''}`} onClick={()=>setSearchData(prev=>({...prev,filter:"category"}))}>Category</span>
                        <span className={`filter ${searchData.filter==="title"?'current-filter':''}`} onClick={()=>setSearchData(prev=>({...prev,filter:"title"}))}>Title</span>
                        <span className={`filter ${searchData.filter==="description"?'current-filter':''}`} onClick={()=>setSearchData(prev=>({...prev,filter:"description"}))}>Description</span>
                    </>
                    :
                    <></>
                }
                <button onClick={saveChanges}>Save</button>
            </div>
        </div>
    )
}
  
export default Filters