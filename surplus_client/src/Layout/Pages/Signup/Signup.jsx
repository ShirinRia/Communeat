import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import useAuth from "../../../Hooks/useAuth";
import { updateProfile } from "firebase/auth";
import useAxiossecure from "../../../Hooks/useAxiossecure";
import { Helmet } from "react-helmet-async";
const Signup = () => {
    const { createuser,signgoogle } = useAuth()
    const navigate = useNavigate();
    const axiosSecure = useAxiossecure()
    const url = `/users`;
    const handleregistration = e => {
        e.preventDefault();
        const formreg = new FormData(e.currentTarget);
        const email = formreg.get('email')
        const password = formreg.get('password')
        const name = formreg.get('name')
        let photo = formreg.get('photo')
        if (!photo) {
            photo = "https://i.ibb.co/0jQwXPz/download.jpg"
        }
        // setregerror('')

        if (password.length < 6) {
            // setregerror("password length less then 6")
            Swal.fire({
                title: `password length less then 6`,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            // setregerror("Password should have a capital letter")
            Swal.fire({
                title: `Password should have a capital letter`,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
            return;
        }
        else if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\|-]/.test(password)) {
            // setregerror("Password should have a Special Character")
            Swal.fire({
                title: `Password should have a Special Character`,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
            return;
        }
        const newuserdata = { name, email, photo }
        console.log(newuserdata);
        createuser(email, password)
            .then((userCredential) => {

                const currentuser = userCredential.user;
                console.log(currentuser)
                const createat = currentuser.metadata.creationTime

                updateProfile(currentuser, {
                    displayName: name,

                    photoURL: photo
                })
                    .then(() => {
                        // Profile updated!
                        const newuserdata = { name, email, photo, createdAt: createat }
                        console.log(newuserdata);
                        
                        axiosSecure.post(url, newuserdata)
                            .then(function (response) {
                                console.log(response);
                                if (response.data.insertedId) {
                                    Swal.fire({
                                        title: 'Success!',
                                        text: 'Registered with email Successfully',
                                        icon: 'success',
                                        confirmButtonText: 'OK'
                                    })
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                       
                        navigate("/");

                    })
                    .catch((error) => {

                        // setregerror(error.message);
                        Swal.fire({
                            title: `${error.message}`,
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        })
                    });

            })
            .catch((error) => {
                const er = error.message;
                console.log(er)
                Swal.fire({
                    title: `${er}`,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })

            });

    }
    const handlegoogle = () => {
        signgoogle()
            .then((result) => {

                // The signed-in user info.
                const user = result.user;
                const email = user.email

                const name = user.displayName
                let photo = user.photoURL
                const createat = user.metadata.creationTime
                const newuserdata = { name, email, photo, createdAt: createat }
                console.log(newuserdata);
                axiosSecure.post(url, newuserdata)
                .then(function (response) {
                    console.log(response);
                    if (response.data.insertedId) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Registered with email Successfully',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

                navigate("/");

            }).catch((error) => {

                console.log(error.message);

            });

    }
    return (
        <div className="max-w-7xl mx-auto my-16">
            <Helmet>
                <title>Communeat | SignUp</title>
            </Helmet>
            <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 bg-gray-900 text-gray-100 mx-auto">
                <h2 className="mb-3 text-3xl font-semibold text-center">Sign Up</h2>
                <p className="text-sm text-center text-gray-400"> <span>Already have account? </span>
                    <Link to={'/login'} className="focus:underline hover:underline">Sign In here</Link>
                </p>
                <div className="my-6 space-y-4">
                    <button onClick={handlegoogle} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md  border-gray-400 focus:ri">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                        <p>Signup with Google</p>
                    </button>
                    {/* <button aria-label="Login with GitHub" role="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ri focus:ri border-gray-400 focus:ri">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                            <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                        </svg>
                        <p>Login with GitHub</p>
                    </button> */}

                </div>
                <div className="flex items-center w-full my-4">
                    <hr className="w-full text-gray-400" />
                    <p className="px-3 text-gray-400">OR</p>
                    <hr className="w-full text-gray-400" />
                </div>
                <form onSubmit={handleregistration} className="space-y-8">
                    <div className="space-y-4">
                        <div className="space-y-2">

                            <input type="text" name="name" placeholder="leroy jenkins" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400" />
                        </div>
                        <div className="space-y-2">

                            <input type="email" name="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400" />
                        </div>
                        <div className="space-y-2">

                            <input type="password" name="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400" />
                        </div>
                        <div className="space-y-2">

                            <input type="url" name="photo" placeholder="Photo URL" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400" />
                        </div>
                    </div>
                    {/* <button type="button" className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900">Sign up</button> */}
                    <input type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900" value="Sign Up" />
                </form>
            </div>
        </div>
    );
};

export default Signup;