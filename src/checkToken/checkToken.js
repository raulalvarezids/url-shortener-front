import {delUser} from '../redux/userSlice.js'


export const checkToken = (time,dispatch) => {            
    const saveDate = new Date(time);
    const currentTime = new Date(); 
    
    const elapsedTime = currentTime - saveDate;         

    if (elapsedTime >= 3600000) {                  
        localStorage.setItem('USER__URL',null)        
        dispatch(delUser)        
        return true
    }
    
    return false    
}