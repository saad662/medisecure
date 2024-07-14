import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import React, { Suspense, lazy, Fragment, useEffect } from 'react';

const ProtectedRoute = ({ Component, user, path, ...props }) => {
    console.log(user, 'userrr');
    if (user)
        return <Component {...props} />;
    else {
        return <Redirect to={'/login'} />
    }
};

export default ProtectedRoute;