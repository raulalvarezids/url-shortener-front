import { useSelector } from "react-redux";
import Nav from "../components/profile/Nav";
import '../assets/css/profile/profile.css'
import { useEffect, useState } from "react";
import axios from 'axios'

import Loader from "../components/profile/Loader.jsx";
import UlrShow from "../components/profile/UrlShow.jsx";
import { checkToken } from "../checkToken/checkToken.js";
import { useDispatch } from "react-redux";
import toast, {Toaster} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

function Profile() {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [urls,setUrls] = useState([])
    const [loading,setLoading] = useState(true)
    
    useEffect(() => {    
            const status = checkToken(user.time,dispatch)
            
            if(!status){
                axios.get(import.meta.env.VITE_APIHOST+'/urls/getById', 
                {headers : {
                    'Authorization': `Bearer ${user.token}`   
                }})
                .then(response => {                                                
                    setUrls(response.data)                                 
                    setTimeout(()=> {
                        setLoading(false)     
                    }, 800)                                        
                })
                .catch(error => {    
                });
            }else{
                toast.error("The session has expired", {duration:1000})  
                
                setTimeout(() => {
                    navigate('/')
                }, 1400)
                
            }
            

    },[])

    return (  
        <div>

            <Toaster
                    position="top-center"
                    reverseOrder={false}            
            />

            <Nav></Nav>
            <h1 className="tittle__profile">Welcome : {user.username}</h1>
                
            {
                loading ?  <Loader/> : urls.length > 0 ? <UlrShow urls={urls}  /> : <h1 className="out__url">Sin urls</h1>                
            }
                   

        </div>
    );    
}

export default Profile;