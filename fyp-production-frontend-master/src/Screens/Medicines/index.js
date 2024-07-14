import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import ViewMedicines from './View';
import AddMedicine from './Add';

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

const Medicines = ({ match }) => (
    <Fragment>
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route exact path={`${match.url}/`} component={ViewMedicines} />
                    <Route path={`${match.url}/Add`} component={AddMedicine} />
                </div>
                <AppFooter />
            </div>
        </div>
    </Fragment>
);

export default Medicines;