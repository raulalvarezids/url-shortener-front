// import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";



import { useEffect, useState } from 'react';
import Nav from '../components/home/Nav.jsx';
import '../assets/css/home/home.css'
import Short from '../components/home/Short.jsx';
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'

function Home() {
    const user = useSelector((state) => state.user)
    // const dispatch = useDispatch();
    const [urlLong,setUrlLong] = useState('')
            
    const [status,setStatus] = useState(false)
    const [short,setShort] = useState('')    
    

    useEffect(()=>{        

        if(user.token == ''){            
            setStatus(false)
        }else{            
            setStatus(true)
        }

    },[user])

    // const checkLocal = () =>{

    //     const usuario = localStorage.getItem('USER__URL')
    //     const parses  =  JSON.parse(usuario)
    //     console.log(parses)
    // }

    // const delLocal = () =>{

    //     const st = {    
    //         username:'',
    //         token:'',    
    //     }

    //     localStorage.setItem('USER__URL',null)   
    //     dispatch(delUser())
    // }



    const handleUrlLong = (e) => {
        setUrlLong(e.target.value)
    }


    const handleSendUrl = async () => {
                
        const data = {url:urlLong}
        const tk = status ? user.token : 'invitado'

        if(urlLong !== ''){
            const headers =  {
                headers : {
                'Authorization': `Bearer ${tk}`   
                }
            }

            await axios.post(import.meta.env.VITE_APIHOST+'/urls', data,headers)
            .then(response => {                            
                setShort(response.data)          
            })
            .catch(error => {

                if(error.code !== "ERR_NETWORK"){
                    toast.error(error.response.data, { duration: 1500 });               
                }else{
                    toast.error("Please try later", { duration: 1500 });               
                }
                              
            });
        }else{
            toast.error('Add an URL', { duration: 1500 });    
        }

    }


    return (  


        <div className='home__initial'>
            <Nav status={status}/>


            <Toaster
                    position="top-center"
                    reverseOrder={false}            
            />

            <h1 className='tittle__home' >Free Url Shortener</h1>
            
            <div className='container__home'>

                <div className='container__inputs'> 
                    <input type="text" placeholder='Enter link here' className='input__link' onChange={handleUrlLong} />
                    <button className='button__get__link'  onClick={() => handleSendUrl()}>Get short url</button>
                </div>
               
                {
                    short !== '' ? <Short url={short}/> : null
                }

            </div>
        </div>

    );
}

export default Home;