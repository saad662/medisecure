import React, { useEffect, useState } from 'react'
import { Navigate, Route } from "react-router-dom";

function ProtectedRoute({ children }) {
    const isAuthenticated = localStorage.getItem("user")

    return isAuthenticated ? children : <Navigate to="/login" />;

}

export default ProtectedRoute;