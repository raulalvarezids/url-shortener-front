import Nav from "../components/login/Nav";
import Form from '../components/register/Form.jsx'
import { useState } from "react";
import toast, {Toaster} from 'react-hot-toast'
import axios from "axios";


import {addUser} from '../redux/userSlice.js'
import { saveUser } from '../redux/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Register() {
    
    const navigate = useNavigate();   
    const dispatch = useDispatch();

    const [user,setUser] = useState('')
    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePass = (e) => {                   
        setPass(e.target.value)
    }

    const handleUser = (e) => {                   
        setUser(e.target.value)
    }    



    const handleSetLoggin = async () => {

        const data = {email:email,password:pass}
            
            await axios.post(import.meta.env.VITE_APIHOST+'/user/login', data)
            .then(response => {                                                           
                dispatch(addUser(response.data))
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



    const handleSend = async (e) => {
        e.preventDefault();

        if (email === '' || pass === '' || user === ''){
            
            toast.error("Complete all fields " ,{duration: 1500,})

        }else{             

            const validator =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
            if( validator.test(email) ){
                
            const data = {email:email,password:pass,username:user}
            
            await axios.post(import.meta.env.VITE_APIHOST+'/user', data)
            .then(response => {                                                    

                toast.success(response.data, { duration: 1500 });               
                                
                setTimeout(() => {                    
                    handleSetLoggin()                    
                }, 2000);

            })
            .catch(error => {
                
                if(error.code !== "ERR_NETWORK"){
                    toast.error(error.response.data, { duration: 1500 });               
                }else{
                    toast.error("Please try later", { duration: 1500 });               
                }
              
            });


            }else{
                toast.error('correo  novalido', { duration: 1500 });                 
            }

            

         }
    }

    return ( 
        <div>

            <Toaster
                position="top-center"
                reverseOrder={false}            
            />

            <Nav/>

            <Form handlePass={handlePass} handleEmail={handleEmail} handleSend={handleSend} handleUser={handleUser} />

        </div>

     );
}

export default Register;