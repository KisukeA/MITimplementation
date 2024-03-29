import { useEffect, useContext, useState } from "react";
import "./FilterStyles.css";

const Filters = ({filtersRef,filtersOpen, setFiltersOpen}) => {
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
            <h1 className="fffaaa">Filters</h1>
            <div className="filters-content">
                <span className="setting"></span>
                <span className="setting"></span>
                <span className="setting"></span>
                <span className="setting"></span>
                <span className="setting">ff</span>
                <button className="filters-button" onClick={saveChanges}>Save</button>
            </div>
        </div>
    )
}
  
export default Filters