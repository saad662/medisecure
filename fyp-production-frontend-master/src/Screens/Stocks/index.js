import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import ViewStocks from './View';
import AddStocks from './Add';

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

const Stocks = ({ match }) => (
    <Fragment>
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route exact path={`${match.url}/`} component={ViewStocks} />
                    <Route path={`${match.url}/Add`} component={AddStocks} />
                </div>
                <AppFooter />
            </div>
        </div>
    </Fragment>
);

export default Stocks;