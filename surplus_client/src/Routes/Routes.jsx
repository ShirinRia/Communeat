import {
    createBrowserRouter
} from "react-router-dom";

import Root from "../Layout/Pages/Root";
import Home from "../Layout/Pages/Home/Home";
import Addfood from "../Layout/Pages/Addfood/Addfood";
import Login from "../Layout/Pages/Login/Login";
import Signup from "../Layout/Pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute";
import Availablefood from "../Layout/Pages/Availablefood/Availablefood";
import Singlefood from "../Layout/Pages/Availablefood/Singlefood";
import Managefood from "../Layout/Pages/Managemyfood/Managefood";
import Myfoodrequest from "../Layout/Pages/MyFoodRequest/Myfoodrequest";
import Manage from "../Layout/Pages/ManageSingleFoodRequest/Manage";
import Errorpage from "../Layout/Pages/Errorpage/Errorpage";
import Moneydonation from "../Layout/Pages/MoneyDonation/Moneydonation";
import Receipt from "../Layout/Pages/MoneyDonation/Receipt";
import Infoupdate from "../Layout/Pages/Managemyfood/Infoupdate";



const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Errorpage></Errorpage>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/addfood",
                element: <PrivateRoute> <Addfood /></PrivateRoute>,
            },
            {
                path: "/avfood",
                // element:<PrivateRoute><Availablefood /></PrivateRoute> ,
                element:<Availablefood />
                // loader: () => fetch(`http://localhost:5000/foods`)
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
           
            {
                path: "/managefood",
                element: <PrivateRoute><Managefood /></PrivateRoute>,
            },
            {
                path: "/donation",
                element: <PrivateRoute><Moneydonation /></PrivateRoute>,
            },
            {
                path: "/receipt",
                element: <PrivateRoute><Receipt /></PrivateRoute>,
                // loader:()=>fetch(`http://localhost:5000/receipt`)
            },
            {
                path: "/foodrequest",
                element: <PrivateRoute><Myfoodrequest /></PrivateRoute>,
            },

            {
                path: "/singlefood/:id",
                element: <PrivateRoute><Singlefood></Singlefood></PrivateRoute>,
                loader: ({ params }) => fetch(`https://surplus-server.vercel.app/singlefood/${params.id}`)
            },
            
            {
                path: "/manage/:id/:name",
                element: <PrivateRoute><Manage></Manage></PrivateRoute>,
                loader: ({ params }) => fetch(`https://surplus-server.vercel.app/manage/${params.id}`)
            },
            {
                path: "/updatefood/:id",
                element: <Infoupdate></Infoupdate>,
                loader: ({params}) => fetch(`https://surplus-server.vercel.app/getmyonefood/${params.id}`)
            },
        ],
    },
]);

export default Routes;
// SwiperJS , React Slick