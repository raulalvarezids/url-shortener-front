import { useState } from 'react';
import '../../assets/css/register/form.css'
import eye from '../../assets/images/eye.svg'


function Form(props) {    
    const [showPassword, setShowPassword] = useState(false);

    const handleShow = () => {
        setShowPassword(!showPassword)
    }


    return (  
        <form onSubmit={props.handleSend}>
            <div className="container__data__register">


                <h1 className='form__title__register'>Sign up </h1>

                <div className='container__inputs__register'>                
                    <input type="text"  placeholder="User" className='form__input__register' onChange={props.handleUser}/>
                    <input type="text"  placeholder="Email" className='form__input__register' onChange={props.handleEmail}/>
                    
                    
                    <div className="password-input-container__register">
                            <input type={showPassword ? 'text' : 'password'} className='form__input__register' placeholder='Password' onChange={props.handlePass}/>
                            <div className="eye-icon" onClick={() => handleShow()}>
                                <img src={eye} alt=""  className='form__register__eye' />
                            </div>
                        </div>
                    </div>

                <button className='form__button__register' type='submit'>Sign up</button>
                
            
            </div>
        </form>
    );
}

export default Form;