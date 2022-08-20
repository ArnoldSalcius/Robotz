import React, { useEffect } from 'react';
import './Button.scss';

const Button = ({ children, color = 'primary', ...props }) => {


    return (
        <button className='uiBtn uiBtn--md uiBtn--primary' {...props}>
            {children}
        </button>
    )
}

export default Button