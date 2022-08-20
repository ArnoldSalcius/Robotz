import React from 'react';
import FooterContact from './FooterContact';

import './Footer.scss';

const Footer = () => {
    return (
        <footer className='footer' id='footer'>
            <div className='footer__about'>
                <div className='footer__createdBy'>
                    Created By <a href='#'>Arnoldas Salcius</a>
                </div>
                <div className='footer__extra'>
                    Thanks to <a href='https://robohash.org/'>{' Robohash.org '}</a> for letting me use their cool robot images!
                </div>
            </div>
            <FooterContact />
        </footer>
    )
}

export default Footer