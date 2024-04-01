import { Link } from "react-router-dom";
import profile from '../../assets/images/profile.svg'
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { delUser} from '../../redux/userSlice.js'


function Logg() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleIcon = () => {
        navigate('/profile')
    }

    const handleLogOut = () => {
        localStorage.setItem('USER__URL',null)   
        dispatch(delUser())
    }

    return (  
        <div className="div__content__home ">
            <Link className='link__home'  to='/' onClick={() => handleLogOut()}>Log out</Link>                      

            <img src={profile} alt="" className="icon__profile__home" onClick={() => handleIcon()} />

        </div>
    );
}

export default Logg;