import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../../Firebase/firebase.config"
import PropTypes from 'prop-types';
import axios from 'axios';

export const Authcontext = createContext(null)
const googleprovider = new GoogleAuthProvider();
const auth = getAuth(app)
const Provider = ({ children }) => {
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(true)
    // const [theme, settheme] = useState(false)

    const createuser = (email, password) => {
        setloading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signin = (email, password) => {
        setloading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signgoogle = () => {
        setloading(true)
        return signInWithPopup(auth, googleprovider)
    }
    const logout = () => {
        setloading(true)
        return signOut(auth)

    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            const usermail = currentuser?.email || user?.email
            setuser(currentuser)

            const loggedinuser = { email: usermail }
            setloading(false)
            if (currentuser) {

                axios.post('https://surplus-server.vercel.app/jwt', loggedinuser, { withCredentials: true },
                )
                    .then(res => {
                        console.log(res.data);
                    })

            }
            else {
                axios.post('https://surplus-server.vercel.app/logout', loggedinuser, { withCredentials: true },
                   
                )
                    .then(res => {
                        console.log(res.data);

                    })
            }

        });

        return () => unsubscribe()
    }, [user?.email])
    const authinfo = {
        user,
        createuser,
        logout,
        signin,
        signgoogle,
        loading,
        // theme,
        // settheme,
    }
    return (
        <Authcontext.Provider value={authinfo}>
            {children}
        </Authcontext.Provider>
    );
};
Provider.propTypes = {
    children: PropTypes.node,
};

export default Provider;