import { useEffect, useState } from "react";
import useAxiossecure from "../../../../Hooks/useAxiossecure";
import Review from "./Review";


const Extrasection2 = () => {

    const axiosSecure = useAxiossecure()
    const [reviews, setreviews] = useState([])
    useEffect(() => {
        const url = `/reviews`
        axiosSecure.get(url)
            .then(res => {
                setreviews(res.data)
            })
    }, [axiosSecure])
    return (
        <div className="max-w-5xl mx-4 lg:mx-auto bg-gray-400  my-16 py-16 flex justify-center">
           <Review reviews={reviews}></Review>
        </div>

    );
};

export default Extrasection2;