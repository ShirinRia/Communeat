import { useEffect, useState } from "react";


const useServices = () => {
    const [services, setservices] = useState([])
    useEffect(() => {
        fetch('https://car-doctor-server-nine-roan.vercel.app/services')
            .then(res => res.json())
            .then(data => setservices(data))
    }, [])
    return services
};

export default useServices;