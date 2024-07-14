import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import WidgetsChartBoxes from "./ChartBoxes/";

// Layout
import AppFooter from "../../Layout/AppFooter/";
import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";

const Widgets = ({ match }) => (
  <Fragment>
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          <Route
            path={`${match.url}/dashboard-boxes`}
            component={WidgetsChartBoxes}
          />
        </div>
        <AppFooter />
      </div>
    </div>
  </Fragment>
);

export default Widgets;
