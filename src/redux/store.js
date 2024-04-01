import {configureStore} from '@reduxjs/toolkit'
import  useReducer  from './userSlice'

export const store = configureStore(
    {
        reducer:{
            user:useReducer
        }
    }
)

export const saveUser = () => {    
    const state = store.getState()
    localStorage.setItem('USER__URL', JSON.stringify(state))
}
