import { createSlice } from "@reduxjs/toolkit";

const st = {    
    username:'',
    token:'',   
    time:''
    
}

let initialState = {}

const usuario = localStorage.getItem('USER__URL')

if (JSON.parse(usuario) != null){
    const parses  =   JSON.parse(usuario) 
    initialState = parses.user
}else{
    initialState = st
}


export const userSlice = createSlice(
{
    name:'user',
    initialState,
    reducers: {

        addUser : (state,action) => {            
            const {username,token,time} = action.payload
            state.username = username
            state.token = token
            state.time  = time 
        },
        delUser : (state,action) => {
            state.username=''
            state.token=''
            state.time=''
        }
    }
}
)

export const { addUser,delUser} = userSlice.actions;
export default userSlice.reducer;