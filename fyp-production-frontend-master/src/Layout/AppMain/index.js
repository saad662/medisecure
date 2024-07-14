import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import React, { Suspense, lazy, Fragment, useEffect } from 'react';

import {
    ToastContainer,
} from 'react-toastify';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';
const Dashboards = lazy(() => import('../../DemoPages/Dashboards'));

const Widgets = lazy(() => import('../../DemoPages/Widgets'));
const Elements = lazy(() => import('../../DemoPages/Elements'));
const Components = lazy(() => import('../../DemoPages/Components'));
const Charts = lazy(() => import('../../DemoPages/Charts'));
const Forms = lazy(() => import('../../DemoPages/Forms'));
const Tables = lazy(() => import('../../DemoPages/Tables'));
const Login = lazy(() => import("../../Screens/Login"));
const Register = lazy(() => import("../../Screens/Register"));
const Medicines = lazy(() => import("../../Screens/Medicines"));
const Stocks = lazy(() => import("../../Screens/Stocks"));
const Orders = lazy(() => import("../../Screens/Orders"));

const LoadingComponent = () => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center h-100'>
            <img width={200} height={100} src={require("../../assets/images/logo.png")} />
            <h3 className="mt-5">Loading...</h3>
        </div>
    )
};
const AppMain = ({ user }) => {
    return (
        <Fragment>

            {/* Components */}

            <Suspense fallback={<LoadingComponent />} >
                <Route path="/components" component={Components} />
            </Suspense>

            {/* Forms */}

            <Suspense fallback={<LoadingComponent />}>
                <Route path="/forms" component={Forms} />
            </Suspense>

            {/* Charts */}

            <Suspense fallback={<LoadingComponent />}>
                <Route path="/charts" component={Charts} />
            </Suspense>

            {/* Tables */}

            <Suspense fallback={<LoadingComponent />}>
                <Route path="/tables" component={Tables} />
            </Suspense>

            {/* Elements */}

            <Suspense fallback={<LoadingComponent />}>
                <Route path="/medicine" component={Medicines} />
            </Suspense>

            <Suspense fallback={<LoadingComponent />}>
                <Route path="/stocks" component={Stocks} />
            </Suspense>

            <Suspense fallback={<LoadingComponent />}>
                <Route path="/orders" component={Orders} />
            </Suspense>

            {/* Dashboard Widgets */}

            <Suspense fallback={<LoadingComponent />}>
                <Route path="/widgets" component={Widgets} />
            </Suspense>

            {/* Dashboards */}

            <Suspense fallback={<LoadingComponent />}>
                <Route path="/dashboard" component={(props) => <ProtectedRoute {...props} user={user} Component={Dashboards} />} />
            </Suspense>

            {/* Dashboards */}

            <Suspense fallback={<LoadingComponent />}>
                <Route path="/login" component={Login} />
            </Suspense>

            <Suspense fallback={<LoadingComponent />}>
                <Route path="/register" component={Register} />
            </Suspense>

            <Route exact path="/" render={() => (
                <Redirect to="/login" />
            )} />
            <ToastContainer />
        </Fragment>
    )
};

const mapStateToProps = ({ Register, Login }) => {
    return {
        isLoading: Register.isLoading,
        error: Register.error,
        user: Login.user,
    }
};

const mapDispatchToProps = {

};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppMain);