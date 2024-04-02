import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './pages/Home.jsx'
import {Provider} from 'react-redux'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { store } from './redux/store.js'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'
import UrlData from './components/profile/UrlData.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path:'/login',
    element: <Login/>
  },{
    path:'/register',
    element:<Register/>
  },
  {
    path:'/profile',
    element: <Profile/>,
    // children:[
    //   {
    //     path:'/profile/:code',
    //     element: <UrlData/>
    //   }
    // ]
  },
  {
    path:'/profile/data/:code',
    element:<UrlData/>
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Provider store={store}> 
      <RouterProvider router={router} />
    </Provider>
     
  </React.StrictMode>,
)
