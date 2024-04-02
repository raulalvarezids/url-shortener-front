import { useNavigate } from "react-router-dom";


function Url(props) {   
        
    const navigate = useNavigate()

    const handleMove = ()  => {
        navigate(`/profile/data/${props.url.code}`)        
    }

    return (  
        <div >                                                
            <button className='button__code'  key={props.url._id} onClick={() => handleMove() }>{props.url.code}</button>
           
        </div>

    );

}

export default Url;