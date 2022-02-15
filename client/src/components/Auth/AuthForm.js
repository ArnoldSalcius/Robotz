import React, { useState } from 'react';




const AuthForm = ({ register = true }) => {


    const [input, setInput] = useState();



    return (
        <div className='authForm'>
            <div>Register</div>
            <form>
            </form>
        </div>
    )

}


export default AuthForm;
