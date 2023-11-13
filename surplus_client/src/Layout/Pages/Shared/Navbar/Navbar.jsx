import { Link, NavLink, useNavigate } from "react-router-dom";
import './Navbar.css'
import useAuth from "../../../../Hooks/useAuth";
import { useAnimate, stagger, motion } from "framer-motion";
import { useEffect, useState } from "react";
const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });
function useMenuAnimation(isOpen) {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        //   animate(".arrow", { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });

        animate(
            "ul",
            {
                clipPath: isOpen
                    ? "inset(0% 0% 0% 0% round 10px)"
                    : "inset(10% 50% 90% 50% round 10px)"
            },
            {
                type: "spring",
                bounce: 0,
                duration: 0.5
            }
        );

        animate(
            "li",
            isOpen
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
            {
                duration: 0.2,
                delay: isOpen ? staggerMenuItems : 0
            }
        );
    }, [animate, isOpen]);

    return scope;
}
const Navbar = () => {
    const navigate = useNavigate()
    const gotoreceipt = () => {
        navigate('/receipt')
    }
    const { user, logout } = useAuth()
    const [currentuser, setcurrentuser] = useState([])
    useEffect(() => {
        setcurrentuser(user)
    }, [user])
    console.log(currentuser)

    const [isOpen, setIsOpen] = useState(false);
    const scope = useMenuAnimation(isOpen);

    const handlelogout = () => {
        logout()
            .then(() => { })
            .catch(error => console.log(error))
    }
    const navlinks = <>
        <li className="font-medium"><NavLink to={'/'}>Home</NavLink></li>
        <li className="font-medium"><NavLink to={'/avfood'}>Available Foods</NavLink> </li>

        {user &&
            <>
                <li className="font-medium"><NavLink to={'/addfood'}>Add Food</NavLink></li>
                <li className="font-medium"><NavLink to={'/managefood'}>Manage My Foods</NavLink></li>
                <li className="font-medium"><NavLink to={'/foodrequest'}>My Food Request</NavLink></li>


            </>}
    </>
    return (
        <div className="mb-8">
            <header className="p-4 dark:bg-gray-800 dark:text-gray-100 bg-gray-800 text-gray-100">
                <div className="container flex gap-10 items-center justify-between h-16 max-w-7xl mx-auto">

                    <a href="/" aria-label="Back to homepage" className="flex items-center p-2 ">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-violet-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-8 h-8 dark:text-violet-400">
                                <path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11.922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742zM27.383 21.961c0 0.389-0.211 0.73-0.526 0.914l-0.004 0.002-10.324 5.961c-0.152 0.088-0.334 0.142-0.53 0.142s-0.377-0.053-0.535-0.145l0.005 0.002-10.324-5.961c-0.319-0.186-0.529-0.527-0.529-0.916v-11.922c0-0.389 0.211-0.73 0.526-0.914l0.004-0.002 10.324-5.961c0.152-0.090 0.334-0.143 0.53-0.143s0.377 0.053 0.535 0.144l-0.006-0.002 10.324 5.961c0.319 0.185 0.529 0.527 0.529 0.916z"></path>
                                <path d="M22.094 19.451h-0.758c-0.188 0-0.363 0.049-0.515 0.135l0.006-0.004-4.574 2.512-5.282-3.049v-6.082l5.282-3.051 4.576 2.504c0.146 0.082 0.323 0.131 0.508 0.131h0.758c0.293 0 0.529-0.239 0.529-0.531v-0.716c0-0.2-0.11-0.373-0.271-0.463l-0.004-0.002-5.078-2.777c-0.293-0.164-0.645-0.26-1.015-0.26-0.39 0-0.756 0.106-1.070 0.289l0.010-0.006-5.281 3.049c-0.636 0.375-1.056 1.055-1.059 1.834v6.082c0 0.779 0.422 1.461 1.049 1.828l0.009 0.006 5.281 3.049c0.305 0.178 0.67 0.284 1.061 0.284 0.373 0 0.723-0.098 1.027-0.265l-0.012 0.006 5.080-2.787c0.166-0.091 0.276-0.265 0.276-0.465v-0.716c0-0.293-0.238-0.529-0.529-0.529z"></path>

                            </svg>
                        </div>
                        <h1 className="text-3xl ml-2 font-medium hidden md:block">Communeat</h1>
                    </a>
                    <ul className="items-center hidden space-x-3 lg:flex">

                        {navlinks}
                    </ul>
                    <div className="hidden md:flex items-center ">


                        <div className=" my-5 md:my-0 ">
                            {user ?
                                <div className={`flex items-center gap-3 text-white`}>
                                    <div onClick={gotoreceipt} className="hidden lg:block">

                                        <div className="flex gap-2 items-center  px-3 py-1 rounded-lg   md:mr-0">
                                            <div className="w-10 rounded-full">
                                                <img src={user?.photoURL} className="w-full h-full rounded-full" />

                                            </div>
                                            <div>
                                                <p>{user?.displayName}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button onClick={handlelogout} href="/login" className="hidden lg:block  btn hover:text-white hover:bg-[#e879f9] py-4">Log Out</button>
                                </div>

                                :
                                <Link to={'/login'} className="left-0 hidden lg:block  py-2 font-semibold rounded  dark:bg-violet-400 dark:text-gray-900"> Log in </Link>

                            }

                        </div>

                    </div>
                   <div className={`lg:hidden ${user ? "mt-64" : "mt-24"}`}>
                   <nav className="menu" ref={scope}>
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setIsOpen(!isOpen)}
                            >

                                <div className=" flex justify-end" >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-100">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </div>
                                {/* Framer Motion */}
                            </motion.button>
                            <ul
                                className="bg-gray-700 w-max z-10"
                                style={{
                                    pointerEvents: isOpen ? "auto" : "none",
                                    clipPath: "inset(10% 50% 70% 50% round 10px)"
                                }}

                            >
                                <li >
                                    {
                                        user ? <div className="flex gap-2 items-center  md:mr-0">
                                            <div className="w-5 rounded-full">
                                                <img src={user?.photoURL} className="w-full h-full rounded-full" />

                                            </div>  <div>
                                                <p>{user?.displayName}</p>
                                            </div>
                                        </div>
                                            : <Link to={'/login'} className="left-0  py-2 font-semibold rounded  dark:bg-violet-400 dark:text-gray-900"> Log in </Link>
                                    }

                                </li>

                                {navlinks}
                                {
                                    user &&

                                    <li>

                                        <button onClick={handlelogout} href="/login" className=" hover:text-white hover:bg-[#e879f9] py-4">Log Out</button>
                                    </li>
                                }
                            </ul>{" "}
                        </nav>
                   </div>
                   
                       


                </div>
            </header>
        </div>
    );
};

export default Navbar;