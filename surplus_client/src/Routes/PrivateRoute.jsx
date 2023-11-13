import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'; // ES6
import useAuth from '../Hooks/useAuth';
import RingLoader from "react-spinners/RingLoader";
const PrivateRoute = ({children}) => {
    const {user,loading}=useAuth()
    const location=useLocation()
    console.log(loading)
    if(loading){
        return <div  className=" h-[80vh] flex items-center justify-center"><RingLoader color="#212121" size="100px"/></div>
    }
    else{
    if(user){
        return children
    }
    else{
        return (
            <Navigate state={location.pathname} to={'/login'}></Navigate>
            );
    }
}
   
    
};
PrivateRoute.propTypes = {
    children:PropTypes.node,
};
export default PrivateRoute;