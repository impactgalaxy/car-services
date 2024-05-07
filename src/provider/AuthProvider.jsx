import React from 'react';
import PropTypes from "prop-types";
import auth from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
export const AuthContext = React.createContext(null);
export default function AuthProvider({ children }) {
    const [user, setUser] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const userLogin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const userLogout = () => {
        setLoading(true)
        return signOut(auth);

    }
    React.useEffect(() => {
        const subscriber = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
            if (currentUser) {
                axios.post("http://localhost:5000/jwt", { email: currentUser?.email }, { withCredentials: true }).then(response => {
                    console.log(response);
                })
            }
        })
        return () => subscriber();
    }, [])

    const authInfo = {
        user,
        createUser,
        userLogin,
        userLogout,
        toast,
        loading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
            <Toaster
                position="top-center"
            />

        </AuthContext.Provider>
    )
}
AuthProvider.propTypes = {
    children: PropTypes.node
}