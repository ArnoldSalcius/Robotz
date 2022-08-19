import React from 'react';
import { FaGithub, FaLinkedin, FaIdBadge } from 'react-icons/fa'


const FooterContact = () => {
    return (
        <div className='footer__contact'>
            <div className='footer__contactHeader'>
                Feel free to reach out:
            </div>
            <div className='footer__contactsmth'>
                <div className='footer__contactCell'>
                    <FaGithub />
                    <span>GitHub</span>
                </div>
                <div className='footer__contactCell'>
                    <FaLinkedin />
                    <span>LinkedIn</span>
                </div>
                <div className='footer__contactCell'>
                    <FaIdBadge />
                    <span>Personal Website</span>
                </div>
            </div>

        </div>
    )
}

export default FooterContact