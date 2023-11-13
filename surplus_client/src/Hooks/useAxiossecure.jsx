import axios from "axios";
import { useEffect } from "react";
// import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    // baseURL: 'http://localhost:5000/',
    baseURL: 'https://surplus-server.vercel.app/',
    withCredentials: true
})
const useAxiossecure = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            if (error.response.status === 401 || error.response.status === 403) {
                logout()
                    .then(() => {
                        navigate('/login')
                    })
                    .catch(error => console.log(error))
            }
            console.log(error)
        })
    }, [logout, navigate])
    return axiosSecure;
};

export default useAxiossecure;