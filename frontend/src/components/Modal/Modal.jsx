import React from 'react'
import "./Modal.css"

const Modal = ({open,children}) => {
    return (
       open ?<> <div className="modal__shadow"></div>
       <div id="sam" className="modal__container">
                {children}
            </div>
       </>
        :<div></div>
    )
}

export default Modal
