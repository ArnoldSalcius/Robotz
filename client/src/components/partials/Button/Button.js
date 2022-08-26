import React, { useEffect } from 'react';
import './Button.scss';



const Button = ({ children, color, size, ...props }) => {
    let cName = props.className || '';
    cName += color ? ` uiBtn--${color}` : '';
    cName += size ? ` uiBtn--${size}` : '';

    return (
        <button {...props} className={`uiBtn${cName}`}>
            {children}
        </button>
    )
}

export default Button