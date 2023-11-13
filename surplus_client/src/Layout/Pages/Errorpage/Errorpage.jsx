import { Link } from "react-router-dom";
import error from "../../../error.json"
import Lottie from "lottie-react";
const Errorpage = () => {
    return (
        <div >
            <Lottie className="h-[80vh]"  animationData={error} loop={true} />
            <div className="text-center">
            <Link to={'/'} className="px-8 py-3 font-semibold rounded bg-gray-900 text-gray-100">Back to the HomePage</Link>
            </div>

           
        </div>
    );
};

export default Errorpage;