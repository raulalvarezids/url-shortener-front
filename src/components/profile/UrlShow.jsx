import '../../assets/css/profile/urlshow.css'
import Url from './Url.jsx';
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";


function UlrShow(props) {
    
    return (  

        <div className="urls__container">            
            {
                props.urls.map(e => <Url url={e} key={e._id} />)
            }
            
        </div>
    );
}

export default UlrShow;