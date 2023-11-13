import useAuth from "../../../../Hooks/useAuth";
import Swal from 'sweetalert2'
import useAxiossecure from "../../../../Hooks/useAxiossecure";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Exreasection1 = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiossecure()
    const navigate = useNavigate()
    const handleaddreview = e => {
        e.preventDefault();
        if (!user) {
            Swal.fire({
                title: 'Something Went Wrong!',
                text: "Check if you are logged in",
                icon: 'error',
                confirmButtonText: 'OK'
            })
            navigate('/login')
        }
        else {
            const form = e.target;

            const comment = form.comment.value;
            const reviewer_name = user.displayName
            const reviewer_email = user.email
            const reviewer_image = user.photoURL
            const newreview = { comment, reviewer_name, reviewer_email, reviewer_image }
            // console.log(newreview);

            const url = `/newreview`;
            axiosSecure.post(url, newreview)
                .then(function (response) {
                    console.log(response);
                    if (response.data.insertedId) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Thanks for your Comment',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        })
                        form.reset()
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    Swal.fire({
                        title: 'Something Went Wrong!',
                        text: error,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                });
        }


    }

    return (
        <div className="my-16 max-w-7xl mx-4 lg:mx-auto">

            <form onSubmit={handleaddreview} className="container bg-gray-900    ">
                <h2 className="text-gray-100 text-3xl md:text-5xl pt-6 pl-6">Leave a Feedback</h2>
                <fieldset className="  p-6  rounded-md shadow-sm justify-center">

                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3 m-6 space-y-3">

                        <div className="col-span-full">

                            <textarea name="comment" placeholder="Write Your Feedback" className="w-full h-48 rounded-md focus:ring  border-gray-700 text-gray-900"></textarea>
                        </div>

                        <div className="col-span-full flex justify-center">
                            <motion.input whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }} type="submit" value="Post Feedback" className="w-1/2   text-white text-xl px-8 py-3 font-semibold border rounded dark:border-gray-100 dark:text-gray-100" />
                        </div>
                    </div>

                </fieldset>

            </form>
        </div>
    );
};

export default Exreasection1;