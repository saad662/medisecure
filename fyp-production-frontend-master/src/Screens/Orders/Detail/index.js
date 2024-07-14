import React, { Fragment, useState, useEffect } from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import OrderTable from "../../../Common/OrderTable";
import { getDistributorOrdersAction } from "../../../actions/getDistributorOrders";
import { useLocation } from 'react-router-dom';

const OrderDetails = ({ history, loginAction, user, getDistributorOrdersAction, params }) => {
    const [order, setOrder] = useState([]);
    const location = useLocation();
    useEffect(() => {
        getOrders();
    }, [])
    const getOrders = () => {
        var order = location.state;
        console.log(order, 'order');
    }

    return (
        <Fragment>
            <h3>
                Order
            </h3>
        </Fragment>
    )
};

const mapStateToProps = ({ Register, Login }) => ({
    isLoading: Register.isLoading,
    error: Register.error,
    user: Login.user,
});

const mapDispatchToProps = {
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrderDetails);