import React from 'react';
import { FaGithub, FaLinkedin, FaIdBadge } from 'react-icons/fa'


const FooterContact = () => {
    return (
        <div className='footer__contact'>
            <div className='footer__contactHeader'>
                Feel free to <span style={{ color: 'var(--good-color)' }}>reach out</span>:
            </div>
            <div className='footer__contactList'>
                <a className='footer__contactCell' target="_blank" href='https://www.linkedin.com/in/arnoldsalcius/'>
                    <FaLinkedin size={'2rem'} />
                    <span>LinkedIn</span>
                </a>
                <a className='footer__contactCell' target="_blank" href='https://github.com/ArnoldSalcius' >
                    <FaGithub size={'2rem'} />
                    <span>GitHub</span>
                </a>
                <a className='footer__contactCell' target="_blank" href='#'>
                    <FaIdBadge size={'2rem'} />
                    <span>My Website</span>
                </a>
            </div>

        </div >
    )
}

export default FooterContact