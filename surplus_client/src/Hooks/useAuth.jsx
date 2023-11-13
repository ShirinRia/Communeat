import { useContext } from "react";
import { Authcontext } from "../Layout/Provider/Provider";


const useAuth = () => {
    const Auth=useContext(Authcontext)
    return Auth
};

export default useAuth;