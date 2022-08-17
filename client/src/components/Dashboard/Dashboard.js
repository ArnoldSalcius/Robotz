import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RobotList from '../RobotList/RobotList';
import RobotLottery from '../RobotLottery/RobotLottery';
import RobotStore from '../RobotStore/RobotStore';
import DashboardHome from './DashboardHome';
import { connect } from 'react-redux';
import { clearRobotError, clearRobotErrors, clearRobots } from '../../redux/robots/robotActions';
import UserInfo from './UserInfo/UserInfo';
import Loading from '../Loading/Loading';
import './Dashboard.css';
import ErrorPill from '../partials/ErrorPill/ErrorPill';
import DashboardMenu from './DashboardMenu/DashboardMenu';


const menuButtons = [
    {
        name: 'dashboard',
        buttonStr: 'Overview',
        Element: DashboardHome
    },
    {
        name: 'mylist',
        buttonStr: 'Collection',
        Element: RobotList
    },
    {
        name: 'store',
        buttonStr: 'Store',
        Element: RobotStore
    },
    {
        name: 'lottery',
        buttonStr: 'Lottery',
        Element: RobotLottery
    },


]



const Dashboard = ({ state, clearRobots, clearRobotError, clearRobotErrors }) => {

    // const [currentTab, setCurrentTab] = useState(menuButtons[2].name);
    const isLoading = state.robots.loading;

    const location = useLocation();
    const currentTab = location.pathname.substring(location.pathname.indexOf('/') + 1);


    useEffect(() => {
        if (currentTab === 'dashboard') return;
        const fetchData = async () => {
            await clearRobots();
            await clearRobotErrors();
        }
        fetchData();
    }, [currentTab, clearRobots, clearRobotErrors])




    const renderErrors = () => state.robots.errors.map((error, i) => {

        return (
            <ErrorPill
                key={i}
                error={error?.message || "Unexpected error"}
                onComplete={clearRobotError}
            />

        )
    })

    const renderTab = () => {
        const tab = menuButtons.find(({ name }) => currentTab === name);

        return <tab.Element></tab.Element>

    }


    return (
        <div className='dashboard'>
            <div className='pillErrors'>
                {renderErrors()}

            </div>
            <UserInfo credits={state.robots.credits} robotNum={state.robots.robotNum} />
            {/* menu goes here */}
            <DashboardMenu menuButtons={menuButtons} active={currentTab} />
            {renderTab()}

            {isLoading && <Loading msg={state.robots.loadingMessage} />}


        </div>

    )
}

const mapStateToProps = (state) => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearRobots: () => dispatch(clearRobots()),
        clearRobotError: () => dispatch(clearRobotError()),
        clearRobotErrors: () => dispatch(clearRobotErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);