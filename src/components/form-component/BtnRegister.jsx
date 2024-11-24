import React from 'react';
import '../../index.css';

const BtnRegister = ({ className, registerBtnType }) => {
    return(
        <div className="d-grid mt-2">
            <button type={`${ registerBtnType }`} className={`btn ${ className }`}>Daftar</button>
        </div>
    )
}

export default BtnRegister;