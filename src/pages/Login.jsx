import { useState } from "react";
import Form from "../components/login/Form";
import Nav from "../components/login/Nav";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast'

import {addUser} from '../redux/userSlice.js'
import { saveUser } from '../redux/store';
import { useDispatch } from 'react-redux';

function Login() {
    const navigate = useNavigate();   
    const dispatch = useDispatch();


    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePass = (e) => {                   
        setPass(e.target.value)
    }

    const handleSend = async () => {
                

        if (email === '' || pass === ''){
            toast.error("Complete all fields" ,{duration: 1500,})
        }else{  
            const data = {email:email,password:pass}
            
            await axios.post(import.meta.env.VITE_APIHOST+'/user/login', data)
            .then(response => {                                
                const data = {
                    ...response.data,
                    time:new Date() 
                }                           
                dispatch(addUser(data))
                saveUser()
                navigate('/')
            })
            .catch(error => {
                
                if(error.code !== "ERR_NETWORK"){
                    toast.error(error.response.data, { duration: 1500 });               
                }else{
                    toast.error("Please try later", { duration: 1500 });               
                }
              
            });

        }
    }

    return (  
        <div>
             <Toaster
                    position="top-center"
                    reverseOrder={false}            
                />

            <Nav/>                        
            <Form  handlePass={handlePass} handleEmail={handleEmail} handleSend={() => handleSend()}/>
        </div>    
    );
}

export default Login;