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
                <div className={cName}>
                    <button key={menuButton.name} >
                        <Link to={'/' + menuButton.name}>
                            {menuButton.buttonStr}
                        </Link>
                    </button>
                </div>

            )

        });
    }
    return (
        <div className='dashboardMenu'>
            <h2>Menu</h2>
            <div className='tabs'>{renderButtons()}</div>
        </div>
    )
}

export default DashboardMenu