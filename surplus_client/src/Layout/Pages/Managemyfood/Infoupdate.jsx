import Swal from 'sweetalert2'
import useAuth from '../../../Hooks/useAuth';
import useAxiossecure from '../../../Hooks/useAxiossecure';
import { useLoaderData, useParams } from 'react-router-dom';


const Infoupdate = () => {
    const { id } = useParams()
    const food = useLoaderData()
    console.log(food)
    const { user } = useAuth()
    const axiosSecure = useAxiossecure()

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

        const url = `/updateownfood?id=${id}`;
        axiosSecure.put(url, newfood)
            .then(function (response) {
                console.log(response);
                if (response.data.modifiedCount > 0) {
                    //   setmyfood(newfood)
                    Swal.fire({
                        title: 'Success!',
                        text: 'Product Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'Thank You'
                    })
                    form.reset()
                }
                else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Update FAILED',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    return (
        <div>
            <div >
                <div className="max-w-4xl mx-auto  bg-transparent ">

                    <form onSubmit={handleaddproduct} className="container  mx-auto space-y-12">
                        <fieldset className="  p-6 rounded-md shadow-sm bg-gray-900 justify-center">

                            <div className="grid justify-center items-center grid-cols-6 gap-6 col-span-full lg:col-span-3 m-6">
                                <div className="col-span-full sm:col-span-3">

                                    <input name="foodname" type="text" defaultValue={food?.foodname} placeholder="Food name" className="w-full rounded-md focus:ring border-gray-700 text-gray-900" required />
                                </div>

                                <div className="col-span-full sm:col-span-3">

                                    <input name="quantity" type="number" defaultValue={food?.quantity} placeholder="Food Quantity" className="w-full rounded-md focus:ring   border-gray-700 text-gray-900" required />
                                </div>
                                <div className="col-span-full sm:col-span-3">

                                    <input name="address" type="text" defaultValue={food?.address} placeholder="Pickup Location" className="w-full rounded-md focus:ring  border-gray-700 text-gray-900" required />
                                </div>
                                <div className="col-span-full sm:col-span-3">

                                    <input name="status" type="text" defaultValue={"Available"} className="w-full rounded-md focus:ring  border-gray-700 text-gray-900" required disabled />
                                </div>


                                <div className="col-span-full sm:col-span-3">

                                    <input name="expiredate" placeholder="Date" defaultValue={food?.expiredate}
                                        type="date"
                                        className="w-full rounded-md focus:ring  border-gray-700 text-gray-900" required />
                                </div>
                                <div className="col-span-full sm:col-span-3">

                                    <input name="image" type="url" placeholder="Food Image" defaultValue={food?.image} className="w-full rounded-md focus:ring  border-gray-700 text-gray-900" required />
                                </div>

                                <div className="col-span-full">

                                    <textarea name="note" defaultValue={food?.note} placeholder="Additional Notes" className="w-full rounded-md focus:ring  border-gray-700 text-gray-900"></textarea>
                                </div>
                                <input type="submit" value="Update" className="w-full col-span-full  text-white text-xl px-8 py-3 font-semibold border rounded dark:border-gray-100 dark:text-gray-100" />
                            </div>

                        </fieldset>

                    </form>
                </div>

                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
        </div>
    );
};

export default Infoupdate;