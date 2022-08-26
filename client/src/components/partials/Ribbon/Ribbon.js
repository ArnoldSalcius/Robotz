import React from 'react';
import "./Ribbon.scss";

const Ribbon = ({ type, children }) => {

    const cName = 'ribbon' + (type ? ` ribbon--${type}` : '');


    return (
        <div className={cName}>

            {children}
        </div >

    )
}

export default Ribbon