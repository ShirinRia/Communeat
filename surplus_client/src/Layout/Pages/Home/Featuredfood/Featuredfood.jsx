import { Link } from "react-router-dom";
import useFood from "../../../../Hooks/useFood";
import Foodcard from "../../Availablefood/Foodcard";



const Featuredfood = () => {
    const allfoods = useFood()
    const length=6
    const sortallfoods = [...allfoods].sort((a, b) =>
    parseInt(a.quantity) < parseInt(b.quantity) ? 1 : -1,
    );

    return (
        <div className="max-w-7xl mx-4 lg:mx-auto my-16">
            <div className="text-center">
                <h1 className="font-medium text-5xl">Featured Foods</h1>
            </div>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center max-w-6xl mx-auto my-16">
                    {
                        sortallfoods.slice(0, length).map(foodcard => <Foodcard key={foodcard._id}
                            foodcard={foodcard}></Foodcard>)
                    }
                </div>
                <div className="text-center">
                    <Link to={'/avfood'} className="px-8 py-3 font-semibold rounded bg-gray-800 text-gray-100">Show All</Link>
                </div>

            </div>
        </div>
    );
};

export default Featuredfood;