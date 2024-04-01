import {CopyToClipboard} from 'react-copy-to-clipboard'
import toast, {Toaster} from 'react-hot-toast'

function Short(props) {

    const sendMessage = () =>{
        toast.success("Copied successfully",{duration:1300})
    }

    return (
        <div className="container__short">
            
            <Toaster
                    position="top-center"
                    reverseOrder={false}            
            />

            <span className="short__url__link">{props.url}</span>

            <div className="click__copy__container">
                
                <CopyToClipboard  text={props.url}>
                    <span className="click__copy"  onClick={() => sendMessage()}>Copy</span>
                </CopyToClipboard>
                
                
            </div>
            
        </div>
      );
}

export default Short;