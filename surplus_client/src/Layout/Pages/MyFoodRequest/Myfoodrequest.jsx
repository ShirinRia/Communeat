import { useEffect, useState } from "react";
// import useAuth from "../../../Hooks/useAuth";
import useAxiossecure from "../../../Hooks/useAxiossecure";
import Foodrequest from "./foodrequest";
import Norequest from "./Norequest";
import { Helmet } from "react-helmet-async";
import RingLoader from "react-spinners/RingLoader";

const Myfoodrequest = () => {
    // const { user } = useAuth();
    const axiosSecure = useAxiossecure()
    const [myrequestedfoods, setmyrequestedfoods] = useState([])
    const [isproductavailable, setisproductavailable] = useState(true)
    const [loading, setloading] = useState(true)
    // const url = `/requestedfood?email=${user?.email}`;
    const url = `/requestedfood`;
    useEffect(() => {

        axiosSecure.get(url)
            .then(res => {
                setmyrequestedfoods(res.data)
                setloading(false)
            })
        if (!myrequestedfoods.length) {
            setisproductavailable(false)
            // console.log('no')
        }
        else {
            setisproductavailable(true)
        }
    }, [axiosSecure, myrequestedfoods.length, url])

    console.log(myrequestedfoods)
    return (
        <div>
            <Helmet>
                <title>Communeat | Your Food Request</title>
            </Helmet>
            {
                loading ? <div className=" h-[80vh] flex items-center justify-center"><RingLoader color="#212121" size="100px" /></div>
                    : <div>
                        {
                            isproductavailable
                                ? <div className="max-w-7xl mx-auto my-16 ">
                                    {
                                        myrequestedfoods.map(myrequestedfood => <Foodrequest
                                            key={myrequestedfood._id}
                                            myrequestedfood={myrequestedfood}
                                            myrequestedfoods={myrequestedfoods}
                                            setmyrequestedfoods={setmyrequestedfoods}>

                                        </Foodrequest>)
                                    }
                                </div >
                                : <Norequest></Norequest>
                        }
                    </div>
            }

        </div>


    );
};

export default Myfoodrequest;