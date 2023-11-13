
import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import Exreasection1 from "./Extrasection_1/Exreasection1";
import Extrasection2 from "./Extrasection_2/Extrasection2";
import Featuredfood from "./Featuredfood/Featuredfood";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Communeat | Home</title>
            </Helmet>
            <Banner></Banner>
            <Featuredfood></Featuredfood>
            <Extrasection2></Extrasection2>
            <Exreasection1></Exreasection1>
        </div>
    );
};

export default Home;