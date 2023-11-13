import { useLoaderData, useParams } from "react-router-dom";
import Managefoodcaed from "./Managefoodcaed";
import { Helmet } from "react-helmet-async";
import None from "./None";
import { useEffect, useState } from "react";


const Manage = () => {
    const [isproductavailable, setisproductavailable] = useState(true)
    const [allrequest, setallrequest] = useState([])
    const requests = useLoaderData()
    useEffect(() => {
        setallrequest(requests)
        if (!allrequest.length) {
            setisproductavailable(false)
            // console.log('no')
        }
        else {
            setisproductavailable(true)
        }
    }, [allrequest.length, requests])

    const { name } = useParams()

    return (
        <div className="my-16 min-h-screen">
            <Helmet>
                <title>Communeat | Request For Your Donated {name} </title>
            </Helmet>
            {
                isproductavailable
                    ? <div className="max-w-7xl mx-auto my-16 ">
                        {allrequest.map(request => <Managefoodcaed key={request._id}
                            request={request}>

                        </Managefoodcaed>)}
                    </div >
                    : <None></None>
            }

        </div>
    );
};

export default Manage;