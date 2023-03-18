import { Outlet } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'
//import DashHeader from './DashHeader'
//import DashFooter from './DashFooter'

const UserLayout = () => {
    return (
        <>
        <Navbar/>
                <Outlet />
        </>
    )
}
export default UserLayout