import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import ViewOrders from './View';
import OrderDetails from "./Detail";

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

const Orders = ({ match }) => (
    <Fragment>
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route exact path={`${match.url}/`} component={ViewOrders} />
                    <Route exact path={`${match.url}/details`} component={OrderDetails} />
                </div>
                <AppFooter />
            </div>
        </div>
    </Fragment>
);

export default Orders;