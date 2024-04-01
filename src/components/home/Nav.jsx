import '../../assets/css/home/nav__home.css'
import logo from '../../assets/images/url.svg'
import Logg from './Logg';
import NotLogg from './NotLogg';
import { useNavigate } from 'react-router-dom';


function Nav(props) {
    const navigate = useNavigate()


    const handleIcon = () => {
        navigate('/')
    }


    return (  
      <header className="header__home">
            <nav className='nav__home'> 

                <img src={logo} alt=""  className='logo__home' onClick={()  =>  handleIcon()}/>
                
                {
                    props.status ? <Logg/> : <NotLogg/>
                }
                

            </nav>

      </header>

    );
}

export default Nav;