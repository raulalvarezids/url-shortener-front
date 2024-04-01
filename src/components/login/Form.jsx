import { useState } from 'react';
import '../../assets/css/login/form.css'
import eye from '../../assets/images/eye.svg'

function Form(props) {    
    const [showPassword, setShowPassword] = useState(false);

    const handleShow = () => {
        setShowPassword(!showPassword)
    }


    return (  
        <div className="container__data">
            
            <h1 className='form__title'>Sign in </h1>

            <div className='container__inputs__login'>                
                <input type="email"  placeholder="Email" className='form__input__login' onChange={props.handleEmail}/>
                
                <div className="password-input-container">
                        <input type={showPassword ? 'text' : 'password'} className='form__input__login' placeholder='Password' onChange={props.handlePass}/>
                        <div className="eye-icon" onClick={() => handleShow()}>
                            <img src={eye} alt=""  className='form__login__eye' />
                        </div>
                    </div>
                </div>

            <button className='form__button__login' onClick={()=> props.handleSend()}>Sign in</button>
            

        </div>

    );
}

export default Form;