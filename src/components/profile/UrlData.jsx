
import back from '../../assets/images/back.svg'
import edit from '../../assets/images/edit.svg'
import copy from '../../assets/images/copy.svg'
import deletePic from '../../assets/images/delete.svg'

import '../../assets/css/profile/urlData.css'

import { Link } from "react-router-dom";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import toast, {Toaster} from 'react-hot-toast'
import axios from 'axios'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import {CopyToClipboard} from 'react-copy-to-clipboard'
import { useNavigate } from 'react-router-dom'


import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';




function UrlData() {
    let { code } = useParams();
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()

    const [nameEdition,setNameEditing] = useState(true)
    const [urlLongEdition,setUrlLongEditing] = useState(true)
    const [name,setName] = useState('')
    const [urlOld,setUrlOld] =useState('')
    const [url,setUrl] = useState({})
    
    const [someEdited,setSomeEdited] = useState(false)
    const [loading,setLoading] = useState(true)
    

    const [open, setOpen] = useState(false); 

    const handleClickOpen = () => {
        
        setOpen(true);
    };
    
    const handleClose = () => {        
        setOpen(false);
    };  



    const getInfoUrl = async (time) => {
        
        setLoading(true)

        await axios.get(import.meta.env.VITE_APIHOST+`/urls//getByCode/${code}`, 
        {headers : {
            'Authorization': `Bearer ${user.token}`   
        }})
        .then(response => {     
            
            setUrl(response.data)   
            setName(() => response.data.name === undefined ? '' : response.data.name)
            setUrlOld(response.data.urlOld)  

            setTimeout(()=> {
                setLoading(false) 
                setUrlLongEditing(true)
                setNameEditing(true)
                setSomeEdited(false)
            }, time)
           
        })
        .catch(error => {        
        });

    }

    useEffect(() => {        
        getInfoUrl(400)
    },[])

    const handleNameEditing = () => {        
        setNameEditing(!nameEdition)
    }

    const handleUrlLongEditing = () => {       
        setUrlLongEditing(!urlLongEdition)
    }


    const handleName = (e) => {
        if( someEdited === false){
            setSomeEdited(true)
        }
        setName(e.target.value)
    }

    const handleUrlLong = (e) =>{
        if( someEdited === false){
            setSomeEdited(true)
        }
        setUrlOld(e.target.value)
    }

    const setFecha = () => {
        const fechaObjeto = new Date(url.createdAt);
        const fechaFormateada = fechaObjeto.toLocaleString();        
        return fechaFormateada
        
    }
    
    const handleCancel = () => {
        setName(() => url.name === undefined ? '' : url.name )
        setUrlOld(url.urlOld)    
        setUrlLongEditing(true)
        setNameEditing(true)
        setSomeEdited(false)
    }

    const handleUpdateData = async () => {        
                
        if (urlOld === ''){
            toast.error('Url cant be empty',{ duration: 1500 })
        }else{                           
            const data = {
                id:url._id,
                name:name,
                urlOld:urlOld
            }

            await axios.patch(import.meta.env.VITE_APIHOST+'/urls/update/url', data,{
                headers : {
                'Authorization': `Bearer ${user.token}`   
                }
            })
            .then(response => {                                                 
                toast.success(response.data, {duration: 1000})
                getInfoUrl(1000)
                
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

    const sendMessage = () =>{
        toast.success("Copied successfully",{duration:1000})
    }


    const handleSubtmit = async () =>{                

        const data = {
            id:url._id,         
        }

        handleClose()
        
        const header = {
            headers : {
            'authorization': `Bearer ${user.token}`   
            }
        }        

        await axios.delete(import.meta.env.VITE_APIHOST+`/urls/${url._id}`,header)
        .then(response => {                                                                 
                
                toast.success(response.data, {duration: 1000})                

                setTimeout(()=> {
                    navigate('/profile')
                }, 1300)

        })  
        .catch(error => {
                                
                if(error.code !== "ERR_NETWORK"){
                    toast.error(error.response.data.message, { duration: 1500 });               
                }else{
                    toast.error("Please try later", { duration: 1500 });               
                }
                            
        });            

    }


    return (  
        <div> 
            <Toaster
                    position="top-center"
                    reverseOrder={false}            
                />
            <Nav></Nav>

            <div className="urls__container__data">

                

            {
                loading ?  <div className="container__loader__adata"><Loader /></div>  : 
                (

                  <>
                        <div className="back__code__container">

                            <Link className=''  to='/profile' ><img src={back} alt=""  className="back__logo__profile" /></Link>      

                            <div className='container__delete__code'>
                                <img src={deletePic} alt=""  onClick={handleClickOpen} className='icon__delete'/>
                                <h1 className="code__url__data"  >{url.code}</h1>
                            </div>                                                    
                            
                        </div>

                        <div className="url__data__inputs">
                            
                            <div className="input__with__edit">
                                <input type="text" disabled={nameEdition} onChange={handleName} value={name} placeholder={name === '' ? "Without name" : null}  className="input__url"/>
                                <img src={edit} alt=""  className="edit__input" onClick={() => handleNameEditing()}/>
                            </div>

                            <div className="input__with__edit">
                                <input type="text" value={url.urlNew}  disabled className="input__url" />

                                
                                <CopyToClipboard  text={url.urlNew}>
                                    <img src={copy} alt="" className="edit__input" onClick={() => sendMessage()}/>
                                </CopyToClipboard>
                            </div>
                            
                            
                            <div className="input__with__edit">
                                <input type="text" disabled={urlLongEdition} onChange={handleUrlLong} value={urlOld} className="input__url urllong"/>
                                <img src={edit} alt=""  className="edit__input" onClick={() => handleUrlLongEditing()}/>

                                <CopyToClipboard  text={urlOld}>
                                    <img src={copy} alt="" className="edit__input" onClick={() => sendMessage()}/>
                                </CopyToClipboard>

                            </div>

                            <input type="text" value={setFecha()}  disabled className="input__url" />
                        </div>

                        {

                            someEdited ? (<div className="buttons__url">
                            <button className="buttons__url__item" onClick={() => handleUpdateData()}>Update</button>
                            <button className="buttons__url__item" onClick={() => handleCancel()}>Cancel</button> </div>)
                            :
                            null
                        }
                        
                    </>
                   
                )

            }

            </div>



                <Dialog
                    open={open}
                    onClose={handleClose}                                      
                >
                    <DialogTitle className='title__container' > <span className='dialog__title'>Delete Url short</span></DialogTitle>
                    
                    <DialogContent className='dialog__detele__container'>                                                 

                            <p className='dialog__text'>Are you sure you want to delete it?</p>
                            <div className='dialog__acionts'>                                
                                <button className='bt__actions' onClick={() =>  handleSubtmit()} >Delete</button>
                                <button className='bt__actions' onClick={() => handleClose()}>Cancel</button>
                            </div>                            
                       
                    </DialogContent>
                        
                </Dialog>
        </div>        
    );

}

export default UrlData;