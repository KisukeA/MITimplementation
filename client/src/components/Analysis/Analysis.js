import { useEffect, useState } from "react";
import "./Analysis.css";

const Analysis = ({setOpenAnalysis, event}) => {

    const [closing, setClosing] = useState(false);

    useEffect(() => {
        if (closing) {
            const timer = setTimeout(() => {
                setOpenAnalysis(false);
                setClosing(false);
            }, 400);//don't change number, corresponds to animation duration
            return () => clearTimeout(timer);
        }
      }, [closing]);

    return (
      <div className={`analysis ${closing?'closing-a':''}`}>
        <button onClick={()=>{setClosing(true)}}>close</button>
        <span> ashdkfashf</span>
      </div>
    )
  }
  
export default Analysis