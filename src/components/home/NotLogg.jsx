import { Link } from "react-router-dom";

function NotLogg() {
    return ( 

        <div className="div__content__home">
            <Link className='link__home'  to='/login'>Sign in</Link>
             <Link className='link__home'  to='/register'>Sign up</Link>
        </div>
        
     );
}

export default NotLogg;