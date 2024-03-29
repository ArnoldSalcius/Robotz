import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardMenu.scss';

const DashboardMenu = ({ menuButtons, active }) => {


    const renderButtons = () => {
        return menuButtons.map((menuButton) => {
            let cName = 'tab';
            if (menuButton.name === active) {
                cName += " " + 'tab--active'
            }
            return (
                <Link key={menuButton.name} to={'/' + menuButton.name} className={cName}>
                    <div>
                        {menuButton.buttonStr}

                    </div>
                </Link>

            )

        });
    }
    return (
        <div className='dashboardMenu'>
            <div className='tabs'>{renderButtons()}</div>
        </div>
    )
}


export default DashboardMenu