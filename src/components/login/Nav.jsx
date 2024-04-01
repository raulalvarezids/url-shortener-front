import logo from '../../assets/images/url.svg'
import '../../assets/css/login/login__nav.css'
import { useNavigate } from 'react-router-dom';
function Nav() {
    const navigate = useNavigate()


    const handleIcon = () => {
        navigate('/')
    }


    return ( 
        <header className='header__login'>
            <nav className='nav__login'>
                <img src={logo} alt=""  className='logo__login'  onClick={()  =>  handleIcon()}/>                
                <h1 className='tittle__login'>Free Url Shortener</h1>
            </nav>
        </header>
     );
}

export default Nav;