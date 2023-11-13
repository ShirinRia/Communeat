import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import useAuth from "../../../Hooks/useAuth";
import useAxiossecure from "../../../Hooks/useAxiossecure";
import { Helmet } from "react-helmet-async";

const Login = () => {
	const navigate = useNavigate()
    const location = useLocation()
	const { signin, signgoogle } = useAuth()
	const url = `/users`;
	const axiosSecure = useAxiossecure()
	const handlelogin = e => {
		e.preventDefault();
		const logform = new FormData(e.currentTarget)
		const email = logform.get('email')
		const password = logform.get('password')
		// setlogerror('')

		signin(email, password)
			.then((userCredential) => {
				// Signed in 
				const currentuser = userCredential.user;
				console.log(currentuser)

				const olduser = {
					email,
					lastloggedat: currentuser?.metadata?.lastSignInTime
				}
				
				axiosSecure.patch(url, olduser)
					.then(response => {
						console.log(response);
						if (response.data.modifiedCount > 0) {
							Swal.fire({
								title: 'Sign In!',
								text: 'Sign In Successfully',
								icon: 'success',
								confirmButtonText: 'Explore'
							})
						}
					})

				navigate(location?.state ? location.state : '/')
			})
			.catch((error) => {
				
				const errorMessage = error.message;

				if (errorMessage === "Firebase: Error (auth/invalid-login-credentials).")
					
					Swal.fire({
						title: "Invalid Credential",
						showClass: {
							popup: 'animate__animated animate__fadeInDown'
						},
						hideClass: {
							popup: 'animate__animated animate__fadeOutUp'
						}
					})
			});
	}

	// google
	const handlegoogle = () => {
		signgoogle()
			.then((result) => {

				// The signed-in user info.
				const user = result.user;
				console.log(user)
				const email = user.email
				const olduser = {
					email,
					lastloggedat: user?.metadata?.lastSignInTime
				}


			axiosSecure.patch(url, olduser)
					.then(response => {
						console.log(response);
						if (response.data.modifiedCount > 0) {
							Swal.fire({
								title: 'Sign In!',
								text: 'Sign In with google Successfully',
								icon: 'success',
								confirmButtonText: 'Explore'
							})
						}
					})

				navigate(location?.state ? location.state : '/')
			})
			.catch((error) => {
				
				const errorMessage = error.message;

				if (errorMessage === "Firebase: Error (auth/invalid-login-credentials).")
					
					Swal.fire({
						title: "Invalid Credential",
						showClass: {
							popup: 'animate__animated animate__fadeInDown'
						},
						hideClass: {
							popup: 'animate__animated animate__fadeOutUp'
						}
					})
			});

	}
	return (
		<div className="max-w-7xl mx-auto my-16">
			<Helmet>
				<title>Communeat | Login</title>
			</Helmet>
			<div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 bg-gray-900 text-gray-100 mx-auto">
				<h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
				<p className="text-sm text-center text-gray-400"> <span>Dont have account? </span>
					<Link to={'/signup'} className="focus:underline hover:underline">Sign up here</Link>
				</p>
				<div className="my-6 space-y-4">
					<button onClick={handlegoogle} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md  border-gray-400 focus:ri">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
							<path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
						</svg>
						<p>Login with Google</p>
					</button>


				</div>
				<div className="flex items-center w-full my-4">
					<hr className="w-full text-gray-400" />
					<p className="px-3 text-gray-400">OR</p>
					<hr className="w-full text-gray-400" />
				</div>
				<form onSubmit={handlelogin} className="space-y-8">
					<div className="space-y-4">
						<div className="space-y-2">

							<input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400" />
						</div>
						<div className="space-y-2">
							<div className="flex justify-between">

							</div>
							<input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400" />
						</div>
					</div>
					{/* <button type="button" className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900">Sign in</button> */}
					<input type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900" value="Sign In" />
				</form>
			</div>
		</div>
	);
};

export default Login;