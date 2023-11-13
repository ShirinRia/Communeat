import useAxiossecure from "../../../Hooks/useAxiossecure";
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'; // ES6

const Foodrequest = ({ myrequestedfood ,myrequestedfoods,setmyrequestedfoods}) => {
    const axiosSecure=useAxiossecure()
    const {_id,status,image,foodname}=myrequestedfood
    
    const cancelrequest = (id_) => {
        console.log(id_)
        if(status==="Available"){
            const del_url = `/requestedfood/${_id}`
            axiosSecure.delete(del_url)
                .then(res => {
                    console.log(res.data.deletedCount)
                    if (res.data.deletedCount > 0) {
                        const filtered = myrequestedfoods.filter(cart => cart._id !== id_)
                        setmyrequestedfoods(filtered)
                        Swal.fire({
                            title: 'Okay',
                            text: 'Your Requested Removed',
                            icon: 'success',
                            confirmButtonText: 'See You Again'
                        })
                    }
                })
        }

    }
    return (

        <div className="flex flex-col max-w-4xl p-6 space-y-4 sm:p-10 dark:bg-gray-900 dark:text-gray-100 mx-auto border-b-2 border-gray-900">

            <ul className="flex flex-col divide-y divide-gray-700">
                <li className="flex flex-col py-4 sm:flex-row sm:justify-between">
                    <div className="flex w-full space-x-2 sm:space-x-4">
                        <img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" src={image} alt={foodname} />
                        <div className="flex flex-col justify-between w-full pb-4">
                            <div className="flex justify-between w-full pb-2 space-x-2">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold leadi sm:pr-8">{myrequestedfood.foodname}</h3>
                                    <h3 className="text-lg font-semibold leadi sm:pr-8"><span>Donar : </span>{myrequestedfood.donar_name}</h3>
                                    <p className="text-sm dark:text-gray-400">{myrequestedfood.address}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold">Donation Amount : <span>{myrequestedfood.donation_money}</span></p>

                                </div>
                            </div>
                            <div className="flex text-sm divide-x">
                                <button onClick={() => cancelrequest(myrequestedfood._id)} className="flex items-center px-2 py-1 pl-0 space-x-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                        <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                        <rect width="32" height="200" x="168" y="216"></rect>
                                        <rect width="32" height="200" x="240" y="216"></rect>
                                        <rect width="32" height="200" x="312" y="216"></rect>
                                        <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                                    </svg>
                                    <span>Remove</span>
                                </button>
                                <div className="flex items-center px-2 py-1 space-x-1">

                                    <span>{myrequestedfood.status}</span>
                                </div>
                            </div>
                            <div className="flex text-sm divide-x">
                                <div className="flex items-center px-2 py-1 pl-0 space-x-1">

                                    <p>Expire Date: </p>  <span>{myrequestedfood.expiredate}</span>
                                </div>
                                <div className="flex items-center px-2 py-1 space-x-1">

                                    <p>Requested Date: </p> <span>{myrequestedfood.requestdate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>


            </ul>


        </div>

    );
};
Foodrequest.propTypes = {
    myrequestedfood:PropTypes.object,
    myrequestedfoods:PropTypes.array,
    setmyrequestedfoods:PropTypes.func

};
export default Foodrequest;