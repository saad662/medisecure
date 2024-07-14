import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Web3 from "web3";
import Swal from "sweetalert2";
import MedisecureABI from "../MedisecureABI.json";
import "./Dashboard.css";
import { FaTh, FaBoxes, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const Id = user?._id;
  const Name = user?.name;
  const Email = user?.email;
  const [web3, setWeb3] = useState();
  const [contract, setContract] = useState();
  const [orders, setOrders] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    initWeb3();
  }, []);

  const getAllMedicines = async (contractInstance) => {
    try {
      const allMedicines = await contractInstance.methods
        .view_all_medicines()
        .call();
      console.log("All Medicines:", allMedicines);
      setMedicines(allMedicines);
    } catch (error) {
      console.error("Error fetching all medicines:", error);
      throw error;
    }
  };

  const getOrdersByDistributor = async (contractInstance, distributorName) => {
    try {
      const orders = await contractInstance.methods
        .view_orders_by_distributor(distributorName)
        .call();
      console.log("Orders by Distributor:", orders);

      const formattedOrders = orders[0].map((order, index) => ({
        ...order,
        medicineName: orders[1][index],
        transactionHash: orders[2][index],
      }));

      console.log("Formatted Orders:", formattedOrders);
      setOrders(formattedOrders);
    } catch (error) {
      console.error("Error fetching orders by distributor:", error);
      throw error;
    }
  };

  const initWeb3 = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const web3 = new Web3(window.ethereum);
        const contractAddress = "0xb93746FfC6eb1D679365680E9f4C54f3394a53e5";
        const contractInstance = new web3.eth.Contract(
          MedisecureABI,
          contractAddress
        );
        setWeb3(web3);
        setContract(contractInstance);
        getAllMedicines(contractInstance);
        getOrdersByDistributor(contractInstance, Name);
      } else {
        throw new Error("No Ethereum provider found. Install MetaMask.");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Failed to initialize Web3: ${error.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleLogout = () => {
    localStorage.setItem("loggedin", false);
    dispatch(logout());
    window.location.href = "/";
  };

  const convertWeiToBNB = (wei) => {
    return Web3.utils.fromWei(String(wei), "ether");
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title text-center">MediSecure</h2>
          <div className="user-info mt-4">
            <FaUser className="w-25" />
            <div className="user-details">
              <p className="user-name">{Name}</p>
              <p style={{ fontSize: "12px" }}>{Email}</p>
            </div>
          </div>
        </div>
        <ul className="sidebar-menu">
          <a
            href="/dashboard"
            style={{ textDecoration: "none", color: "white" }}
          >
            <li>
              <FaTh /> Dashboard
            </li>
          </a>
          <a
            href="/products"
            style={{ textDecoration: "none", color: "white" }}
          >
            <li>
              <FaBoxes /> Products
            </li>
          </a>
          <li onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </div>
      <div className="main-content">
        <Container className="dashboard-content">
          <Container className="dashboard-container-fluid my-3">
            <h2 style={{ paddingLeft: 10 }}>Purchased Stock Summary</h2>
          </Container>
          <Row className="d-flex align-items-center">
            {orders.length > 0 &&
              orders.map((order, index) => (
                <Col key={index} lg={4} sm={6} className="mb-4">
                  <Card className="dashboard-grid-card">
                    <Card.Body>
                      <Card.Title>Order ID: {order.order_id}</Card.Title>
                      <Card.Text>Medicine Name: {order.medicineName}</Card.Text>
                      <Card.Text>Medicine ID: {order.medicine_id}</Card.Text>
                      <Card.Text>No of Units: {order.quantity}</Card.Text>
                      <Card.Text>
                        Price: {convertWeiToBNB(order.price)} BNB
                      </Card.Text>
                      <Card.Text>Status: {order.status}</Card.Text>
                      <Card.Text>
                        Transaction Hash: {order.transactionHash}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
