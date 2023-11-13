import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";
import useAxiossecure from "../../../Hooks/useAxiossecure";
// import axios from 'axios';
import Swal from 'sweetalert2'
const Addfood = () => {

    const axiosSecure = useAxiossecure()

    const { user } = useAuth()
    console.log(user)
    const handleaddproduct = e => {
        e.preventDefault();
        const form = e.target;
        const foodname = form.foodname.value;
        const quantity = form.quantity.value;
        const address = form.address.value;
        const status = form.status.value;
        const expiredate = form.expiredate.value;
        const note = form.note.value;
        const image = form.image.value;
        const donar_name = user.displayName
        const donar_email = user.email
        const donar_image = user.photoURL
        const newfood = { foodname, quantity, address, status, expiredate, note, image, donar_name, donar_email, donar_image }
        console.log(newfood);

        const url = `/newfood`;
        axiosSecure.post(url, newfood)
            .then(function (response) {
                console.log(response);
                if (response.data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Thanks for your donation',
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
    return (

        <section className="p-6  text-gray-50 max-w-7xl mx-auto">
            <Helmet>
                <title>Communeat | AddFood</title>
            </Helmet>
            <form onSubmit={handleaddproduct} className="container  mx-auto space-y-12">
                <fieldset className="  p-6 rounded-md shadow-sm bg-gray-900 justify-center">

                    <div className="grid grid-cols-6 gap-6 col-span-full lg:col-span-3 m-6">
                        <div className="col-span-full sm:col-span-3">

                            <input name="foodname" type="text" placeholder="Food name" className="w-full rounded-md focus:ring border-gray-700 text-gray-900" required />
                        </div>

                        <div className="col-span-full sm:col-span-3">

                            <input name="quantity" type="number" placeholder="Food Quantity : How much people can eat" className="w-full rounded-md focus:ring   border-gray-700 text-gray-900" required/>
                        </div>
                        <div className="col-span-full sm:col-span-3">

                            <input name="address" type="text" placeholder="Pickup Location" className="w-full rounded-md focus:ring  border-gray-700 text-gray-900" required />
                        </div>
                        <div className="col-span-full sm:col-span-3">

                            <input name="status" type="text" defaultValue={"Available"} className="w-full rounded-md focus:ring  border-gray-700 text-gray-900" required disabled/>

                        </div>


                        <div className="col-span-full sm:col-span-3">

                            <input name="expiredate" placeholder="Date"
                                type="date"
                              
                                className="w-full rounded-md focus:ring  border-gray-700 text-gray-900" required/>
                        </div>
                        <div className="col-span-full sm:col-span-3">

                            <input name="image" type="url" placeholder="Food Image" className="w-full rounded-md focus:ring  border-gray-700 text-gray-900" required/>
                        </div>

                        <div className="col-span-full">

                            <textarea name="note" placeholder="Additional Notes" className="w-full rounded-md focus:ring  border-gray-700 text-gray-900"></textarea>
                        </div>
                        <div className="col-span-full flex justify-center">
                            <motion.input whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }} type="submit" value="Add Food" className=" text-center col-span-full  text-white text-xl px-8 py-3 font-semibold border rounded dark:border-gray-100 dark:text-gray-100" />
                        </div>

                    </div>

                </fieldset>

            </form>
        </section>

    );
};

export default Addfood;