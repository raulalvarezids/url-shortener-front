import Nav from "../components/login/Nav";
import Form from '../components/register/Form.jsx'
import { useState } from "react";
import toast, {Toaster} from 'react-hot-toast'



function Register() {
    
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

    const handleSend = async () => {
        if (email === '' || pass === '' || user === ''){
            toast.error("Complete all fields " ,{duration: 1500,})
        }else{ 
            console.log(user+' '+email+ ' ' + pass)
         }

    }


    return ( 
        <div>

            <Toaster
                position="top-center"
                reverseOrder={false}            
            />

            <Nav/>

            <Form handlePass={handlePass} handleEmail={handleEmail} handleSend={() => handleSend()} handleUser={handleUser} />

        </div>

     );
}

export default Register;