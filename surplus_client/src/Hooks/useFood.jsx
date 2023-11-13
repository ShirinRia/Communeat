import  { useEffect, useState } from 'react';

const useFood = () => {

    const [items, setitems] = useState([])
    useEffect(() => {
        fetch('https://surplus-server.vercel.app/foods')
            .then(res => res.json())
            .then(data => setitems(data))
    }, [])
    return items
};

export default useFood;