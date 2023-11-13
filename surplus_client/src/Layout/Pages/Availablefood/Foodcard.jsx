import { BiRightArrowCircle } from 'react-icons/bi';
import { GrMapLocation } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; // ES6
// import { motion } from "framer-motion";
const Foodcard = ({ foodcard }) => {
    const { _id, address, image, foodname, quantity, expiredate, note, donar_name, donar_image } = foodcard
    return (

        <div className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md bg-gray-900 text-gray-100">
            <div className="flex space-x-4">
                <img alt="" src={donar_image} className="object-cover w-12 h-12 rounded-full shadow bg-gray-500" />
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold">{donar_name}</p>
                    <p className="text-xs text-gray-400 flex gap-2 items-center">
                        <GrMapLocation className='bg-white text-2xl'>

                    </GrMapLocation>
                    <span className='text-base'> {address}</span>
                   
                    </p>
                </div>
            </div>
            <div>
                <img src={image} alt="" className="object-cover w-full mb-4 h-60 sm:h-96 bg-gray-500" />
                <div className='flex justify-between'>
                    <h2 className="mb-1 text-xl font-semibold">{foodname}</h2>
                    <p className="text-sm text-gray-400">Quantity : {quantity}</p>
                </div>
                <p className="text-sm text-gray-400">{note}</p>
            </div>
            <div className="flex flex-wrap justify-between">
                <div className="space-x-2">

                    <p>{expiredate}</p>
                </div>
                <div className="flex space-x-2 text-sm text-gray-400">

                    <Link to={`/singlefood/${_id}`} className="flex items-center p-1 space-x-1.5">
                        <BiRightArrowCircle className='text-3xl' />
                    </Link>
                </div>
            </div>
        </div>

    );
};
Foodcard.propTypes = {
    foodcard: PropTypes.object,
};
export default Foodcard;