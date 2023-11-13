import PropTypes from 'prop-types'; // ES6

const Receiptcard = ({ donation }) => {
    const { donar_image, donated_money, donar_email, donar_name, note,currentDate,currentTime } = donation
    
    return (
        <div className="my-16 max-w-4xl mx-auto">
            <div className="flex flex-col   space-y-4 sm:p-10 dark:bg-gray-900 dark:text-gray-100  border-b-2 border-gray-900">

                <ul className="flex flex-col divide-y divide-gray-700">
                    <li className="flex flex-col sm:flex-row sm:justify-between">
                        <div className="flex w-full space-x-2 sm:space-x-4">
                            <img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" src={donar_image} alt="" />
                            <div className="flex flex-col justify-between w-full ">
                                <div className="flex justify-between w-full  space-x-2">
                                    <div className="text-left italic">
                                        <p className="text-base font-semibold">Donation Amount : <span>{donated_money}</span></p>
                                        <p className="text-base font-semibold">Donar Name : <span>{donar_name}</span></p>
                                        <p className="text-base font-semibold">Donar Email : <span>{donar_email}</span></p>
                                        <p className="text-base font-semibold">Note : <span>{note}</span></p>
                                        <p className="text-base font-semibold">Donation DateTime : <span>{currentDate + '' + currentTime}</span></p>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </li>


                </ul>


            </div>
           
        </div>
    );
};
Receiptcard.propTypes = {
    donation:PropTypes.object,
};
export default Receiptcard;