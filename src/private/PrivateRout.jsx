import React from 'react';
import PropTypes from "prop-types";
import { AuthContext } from '../provider/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom';
import { CustomSpinner } from '../components/CustomSpinner';


export default function PrivateRout({ children }) {
    const { user, loading } = React.useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <CustomSpinner></CustomSpinner>
    }
    if (user !== null) {
        return children
    }

    return <Navigate to="/login" state={location.pathname} replace></Navigate>



}
PrivateRout.propTypes = {
    children: PropTypes.node
}