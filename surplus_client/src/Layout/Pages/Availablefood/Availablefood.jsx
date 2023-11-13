import RingLoader from "react-spinners/RingLoader";
import Foodcard from "./Foodcard";
import { useEffect, useState } from "react";
import useFood from "../../../Hooks/useFood";
import { Helmet } from "react-helmet-async";

const Availablefood = () => {
    // const allfoods = useLoaderData()
    const allfoods = useFood()
    console.log('allfoods', allfoods)
    const [availablefoods, setavailablefoods] = useState([])
    const [loading, setloading] = useState(true)
    const [title, settitle] = useState("Allfoods")
    useEffect(() => {
        setavailablefoods(allfoods)
        setloading(false)
    }, [allfoods])
    console.log('availablefood', availablefoods)

    const handlesearch = e => {
        e.preventDefault();
        const formreg = new FormData(e.currentTarget);
        const searchtext = formreg.get('search')
        console.log(searchtext)
        settitle(searchtext)
        const filtered = allfoods.filter(food => food.foodname.toLowerCase() === searchtext.toLowerCase())
        setavailablefoods(filtered)
    }
    const DoSubmit = (e) => {
        console.log(e.target.value)
        const sortby = e.target.value
        if (sortby === "Sort by Expire date") {
            const sortallfoods = [...allfoods].sort((a, b) =>
                a.expiredate < b.expiredate ? 1 : -1,
            );
            setavailablefoods(sortallfoods)
        }
        else if (sortby === "Sort by Quantity") {
            const sortallfoodsbyquantity = [...allfoods].sort((a, b) =>
                parseInt(a.quantity) < parseInt(b.quantity) ? 1 : -1,
            );
            setavailablefoods(sortallfoodsbyquantity)
        }
    }
    return (
        <div className="max-w-7xl mx-auto my-16 min-h-screen">
            <Helmet>
                <title>Communeat | {title}</title>
            </Helmet>
            <div className="flex gap-5">
                <form onSubmit={handlesearch} className="w-5/6">
                    <div className="border-2 border-gray-400 flex rounded-md">
                        <input type="text" name="search" placeholder="Search..." className="w-full py-4  text-lg  sm:w-full  outline-none border-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900" />

                        <button type="submit" title="Search" className="p-1 focus:outline-none focus:ring">
                            <svg fill="currentColor" viewBox="0 0 512 512" className="w-10 h-10 dark:text-gray-100">
                                <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                            </svg>
                        </button>
                    </div>

                </form>

                <div className="inline-flex items-center divide-x rounded dark:bg-violet-400 dark:text-gray-800 divide-gray-700 w-1/6">

                    <select name='PreviousReceiver' onChange={DoSubmit} className="w-full py-4">
                        <option disabled selected>Sort by</option>
                        <option value='Sort by Expire date'>Sort by Expire date</option>
                        <option value='Sort by Quantity'>Sort by Quantity</option>

                    </select>


                </div>

            </div>


            <div >
                {
                    loading ? <div className=" h-[80vh] flex items-center justify-center"><RingLoader color="#212121" size="100px" /></div>
                        : <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center max-w-6xl mx-auto my-16">
                            {
                                availablefoods.map(foodcard => <Foodcard key={foodcard._id}
                                    foodcard={foodcard}></Foodcard>)
                            }
                        </div >

                }

            </div>
        </div>
    );
};

export default Availablefood;