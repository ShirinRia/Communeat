import { useLoaderData } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import moment from 'moment';
import useAxiossecure from "../../../Hooks/useAxiossecure";
import Swal from 'sweetalert2'
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Singlefood = () => {
    const food = useLoaderData()
   
    const { user } = useAuth()
    const axiosSecure = useAxiossecure()
    const [own,setown]=useState(false)
    useEffect(()=>{
        if(user?.email===food?.donar_email){
            setown(true)
        }
    },[food?.donar_email, user?.email])
    let date = moment();
    let currentDate = date.format('D/MM/YYYY');
    console.log(typeof (currentDate))
    const handlerequest = e => {
        e.preventDefault();
        const form = e.target;
        const foodname = form.foodname.value;
        const foodid = form.foodid.value;
        const quantity = food.quantity;
        const address = form.address.value;
        const Requester_email = user.email;
        const Requester_name = user.displayName;
        const Requester_image = user.photoURL;
        const donar_email = food.donar_email;
        const donar_name = food.donar_name;
        const donation_money = form.money.value;

        const requestdate = currentDate;
        const currentTime = date.format("h:mm:ss a");
        const requesttime = currentTime;

        const expiredate = food.expiredate
        const image = form.image.value;
        const note = form.note.value;
        const status = food.status
        const requestedFood = { foodid, foodname, quantity, address, expiredate, note, image, donar_name, donar_email, Requester_email, Requester_name, Requester_image, donation_money, requestdate, requesttime, status }
        console.log(requestedFood);

        const url = `/requestedfood`;
        axiosSecure.post(url, requestedFood)
            .then(function (response) {
                console.log(response);
                if (response.data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Your Request has been Placed',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    form.reset()
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    return (


        <section className=" text-gray-100 my-16">
            <Helmet>
                <title>Communeat | {food.foodname}</title>
            </Helmet>
            <div className="container bg-gray-500  max-w-4xl p-6 mx-auto space-y-6 sm:space-y-12">
                <div className="flex relative gap-3 mx-auto sm:max-w-full group bg-gray-900 h-[300px]">
                    <img src={food.image} alt="" className="object-cover  w-3/6 h-full rounded  lg:col-span-7 bg-gray-500" />
                    <div className="p-6 space-y-2 md:w-3/6">
                        <h3 className="text-2xl font-semibold sm:text-4xl">{food.foodname}</h3>
                        <span className="text-base text-gray-400 ">Expire Date: {food.expiredate}</span>
                        <p className="text-base text-gray-400 "> Quantity: {food.quantity}</p>
                        <p className="text-base text-gray-400 "> Pickup: {food.address}</p>
                        {/* <button className="px-8 py-3 font-semibold border rounded text-2xl border-gray-100 text-gray-100" htmlFor="my_modal_7">Request</button> */}
                        <div className="h-4">

                        </div>

                        <label htmlFor="my_modal_7" className={`${own && "hidden"}  px-5 py-1 font-semibold border rounded text-2xl border-gray-100  text-gray-100`}>Request</label>
                        <div className="flex space-x-2 absolute bottom-2 right-2">

                            <span className="self-center text-sm">by {food.donar_name}</span>
                            <img alt="" src={food.donar_image} className="object-cover w-8 h-8 rounded-full shadow bg-gray-500" />
                        </div>

                    </div>
                </div>

            </div>


            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal min-h-screen ">
                <div className="max-w-4xl min-h-screen mx-auto modal-box flex items-center bg-transparent ">

                    <form onSubmit={handlerequest} className="container  mx-auto space-y-5 relative">

                        <fieldset className="  p-6 rounded-md shadow-sm bg-gray-500 justify-center">

                            <div className="grid grid-cols-6 gap-6 col-span-full lg:col-span-3 mx-6  ">
                                <div className="sm:col-span-4">

                                    <input name="foodid" type="text" placeholder="Food Id" className="w-full rounded-md focus:ring border-gray-700 text-gray-900" defaultValue={food._id} disabled />
                                </div>
                                <div className="col-span-full sm:col-span-2 ">
                                    <input name="foodname" type="text" placeholder="Food name" className="w-full rounded-md focus:ring border-gray-700 text-gray-900" defaultValue={food.foodname} disabled />
                                </div>
                                <div className="col-span-full sm:col-span-3">

                                    <input name="address" type="text" defaultValue={'PickUp: ' + food.address} className="w-full rounded-md focus:ring  border-gray-700 text-gray-900" disabled />
                                </div>

                                <div className="col-span-full sm:col-span-3">

                                    <input name="uemail" type="email" className="w-full rounded-md focus:ring   border-gray-700 text-gray-900" defaultValue={'Your Email: ' + user.email} disabled />
                                </div>

                                <div className="col-span-full sm:col-span-3">

                                    <input name="dname" type="text" className="w-full rounded-md focus:ring   border-gray-700 text-gray-900" defaultValue={'by ' + food.donar_name} disabled />
                                </div>
                                <div className="col-span-full sm:col-span-3">

                                    <input name="demail" type="email" className="w-full rounded-md focus:ring   border-gray-700 text-gray-900" defaultValue={'by ' + food.donar_email} disabled />
                                </div>

                                <div className="col-span-full sm:col-span-2">

                                    <input name="expiredate" placeholder="Date"
                                        type="text"

                                        className="w-full rounded-md focus:ring  border-gray-700 text-gray-900" defaultValue={'Expire Date : ' + food.expiredate} disabled />
                                </div>
                                <div className="col-span-full sm:col-span-2">

                                    <input name="requestdate" placeholder="Date" defaultValue={'RequestDate : ' + currentDate}
                                        type="text"

                                        className="w-full rounded-md focus:ring  border-gray-700 text-gray-900" disabled />
                                </div>
                                <div className="col-span-full sm:col-span-2">

                                    <input name="money" placeholder="Donation money"
                                        type="number" className="w-full rounded-md focus:ring  border-gray-700 text-gray-900" />
                                </div>
                                <div className="col-span-full sm:col-span-full">

                                    <input name="image" type="text" placeholder="Food Image" className="w-full rounded-md focus:ring  border-gray-700 text-gray-900" defaultValue={food.image} disabled />
                                </div>

                                <div className="col-span-full">

                                    <textarea name="note" placeholder="Additional Notes" className="w-full rounded-md focus:ring  border-gray-700 text-gray-900" defaultValue={food.note}></textarea>
                                </div>

                                <motion.input whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }} type="submit" value="Request" className="w-full col-span-full  text-white text-xl px-8 py-3 font-semibold border rounded dark:border-gray-100 dark:text-gray-100" />
                            </div>

                        </fieldset>

                    </form>
                </div>

                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>


        </section>

    );
};

export default Singlefood;