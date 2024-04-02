import logo from '../../assets/images/url.svg'
import '../../assets/css/profile/nav.css'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { delUser} from '../../redux/userSlice.js'


function Nav() {
    const navigate = useNavigate()
    const dispatch = useDispatch();


    const handleIcon = () => {
        navigate('/')
    }

    const handleLogOut = () => {
        localStorage.setItem('USER__URL',null)   
        dispatch(delUser())
    }     

    return (  

        <header className='header__profile'>
            <nav className='nav__profile'>
                <img src={logo} alt=""  className='logo__profile'  onClick={()  =>  handleIcon()}/>                

                <div className='items__profile'>
                    <Link className='link__home'  to='/' >Home</Link>      
                    <Link className='link__home'  to='/' onClick={() => handleLogOut()}>Log out</Link>      
                </div>                
            </nav>
        </header>

    );
}

export default Nav;