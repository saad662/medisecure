import React, { useEffect, useState } from "react";
import "./Products.css";
import {
  Card,
  Button,
  Modal,
  Row,
  Col,
  Form,
  Container,
} from "react-bootstrap";
import MedisecureABI from "../MedisecureABI.json";
import Swal from "sweetalert2";
import Web3 from "web3";
import { v4 as uuidv4 } from "uuid";
import { FaSearch, FaTh, FaBoxes, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";

const Products = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const Name = user?.name;
  const Email = user?.email;
  const [medicineDetails, setMedicineDetails] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [medicines, setMedicines] = useState({});
  const [manufacturers, setManufacturers] = useState([]);
  const [filteredManufacturers, setFilteredManufacturers] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedStockForBuy, setSelectedStockForBuy] = useState(null);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [quantityToBuy, setQuantityToBuy] = useState(1);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [fullDescription, setFullDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [buying, setBuying] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    initWeb3();
  }, []);

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

  const getAllMedicines = async (contractInstance) => {
    try {
      const allMedicines = await contractInstance.methods
        .view_all_medicines()
        .call();
      const manufacturersSet = new Set(
        allMedicines.map((medicine) => medicine.manufacturer)
      );
      const manufacturersArray = Array.from(manufacturersSet);
      setManufacturers(manufacturersArray);
      console.log(manufacturers);
      setFilteredManufacturers(manufacturersArray);
      console.log(filteredManufacturers);

      const medicinesWithStockDetails = {};
      for (const manufacturer of manufacturersArray) {
        const medicines = await contractInstance.methods
          .view_medicine_by_manufacturer(manufacturer)
          .call();
        const stocks = await Promise.all(
          medicines.map(async (medicine) => {
            const stocks = await contractInstance.methods
              .view_stocks_by_medicine_id(medicine.medicine_id)
              .call();
            return { ...medicine, stocks };
          })
        );
        medicinesWithStockDetails[manufacturer] = stocks;
      }
      setMedicines(medicinesWithStockDetails);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Failed to fetch medicines: ${error.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleNavigateToMedicines = (manufacturer) => {
    setSelectedManufacturer(manufacturer);
  };

  const handleViewStock = (medicine) => {
    setSelectedStock(medicine.stocks);
    setSelectedMedicine(medicine);
    setShowModal(true);
  };

  const handleBuyStockClick = (stock) => {
    setSelectedStockForBuy(stock);
    setQuantityToBuy(1);
    setShowBuyModal(true);
    setShowModal(false);
  };

  const handleBuyConfirm = async () => {
    if (quantityToBuy <= parseInt(selectedStockForBuy.quantity)) {
      try {
        setBuying(true);
        const randomTransactionId = await placeOrder(
          selectedStockForBuy.stock_id,
          quantityToBuy
        );
        // Fetch updated stock details from the blockchain
        const updatedStock = await contract.methods
          .view_stock_by_id(selectedStockForBuy.stock_id)
          .call();

        console.log("UPDATED", updatedStock);
        setSelectedStockForBuy({
          ...selectedStockForBuy,
          quantity: updatedStock.quantity,
        });

        // Fetch medicine details
        const medicineDetails = await contract.methods
          .view_medicine_by_id(selectedMedicine.medicine_id)
          .call();
        setMedicineDetails(medicineDetails);

        setBuying(false);
        setShowBuyModal(false);

        Swal.fire({
          title: "Success",
          text: `Purchase successful. Order ID: ${randomTransactionId}`,
          icon: "success",
          confirmButtonText: "Ok",
        });
      } catch (error) {
        setBuying(false);
        Swal.fire({
          title: "Error",
          text: `Purchase failed: ${error.message}`,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } else {
      setBuying(false);
      Swal.fire({
        title: "Error",
        text: `Selected quantity is greater than available quantity`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const placeOrder = async (stockId, quantity) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const account = accounts[0];

      // Generate a random transaction-like string
      const randomTransactionId = uuidv4();

      // Calculate total price
      const totalPrice = selectedStockForBuy.price * quantity;

      // Interaction with the smart contract to place the order
      await contract.methods
        .add_order(
          randomTransactionId,
          selectedMedicine.medicine_id,
          quantity,
          Name
        )
        .send({ from: account, value: totalPrice });

      return randomTransactionId; // Return the random transaction-like string
    } catch (error) {
      throw new Error(`Failed to place order: ${error.message}`);
    }
  };

  const handleShowDescriptionModal = (description) => {
    setFullDescription(description);
    setShowDescriptionModal(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredManufacturers(manufacturers);
    } else {
      const filtered = manufacturers.filter((manufacturer) =>
        manufacturer.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredManufacturers(filtered);
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
        <div className="topbar">
          <div className="prod__search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by manufacturer name..."
              value={searchTerm}
              onChange={handleSearch}
              className="form-control"
            />
          </div>
        </div>
        <Container className="dashboard-content">
          <div className="prod__header-container">
            <h2 className="prod__header">Buy Medicine Stock</h2>
          </div>

          <div className="w-100" style={{ marginLeft: "20px" }}>
            <h4 className="">Select manufacturer:</h4>
            <Row>
              {filteredManufacturers.length > 0 ? (
                filteredManufacturers.map((manufacturer, index) => (
                  <Col key={index} className="mb-2" md={3}>
                    <Button
                      className="prod__button"
                      onClick={() => handleNavigateToMedicines(manufacturer)}
                    >
                      {manufacturer}
                    </Button>
                  </Col>
                ))
              ) : (
                <p className="text-center" style={{ color: "red" }}>
                  No manufacturers found
                </p>
              )}
            </Row>
          </div>

          <div className="prod__medicines-list w-75 ms-3">
            {selectedManufacturer && (
              <div>
                {medicines[selectedManufacturer] &&
                medicines[selectedManufacturer].length > 0 ? (
                  <Row>
                    {medicines[selectedManufacturer].map((medicine) => (
                      <Col key={medicine.medicine_id} md={6}>
                        <Card className="prod__card p-3">
                          <Card.Body className="d-flex flex-column">
                            <h3 className="mb-3 ">Medicine Details</h3>
                            <Card.Text>Name: {medicine.name}</Card.Text>
                            <Card.Text className="prod__text">
                              {medicine.description.length > 100 ? (
                                <>
                                  {medicine.description.substring(0, 100)}...
                                  <span
                                    className="prod__more-link"
                                    onClick={() =>
                                      handleShowDescriptionModal(
                                        medicine.description
                                      )
                                    }
                                  >
                                    more
                                  </span>
                                </>
                              ) : (
                                `Description: ${medicine.description}`
                              )}
                            </Card.Text>
                            <Card.Text className="prod__text">
                              Category: {medicine.category}
                            </Card.Text>
                            <Card.Text className="prod__text">
                              Formula: {medicine.formula}
                            </Card.Text>
                            <Card.Text className="prod__text">
                              Chemicals: {medicine.chemicals}
                            </Card.Text>
                            <Card.Text className="prod__text">
                              Type: {medicine.medicine_type}
                            </Card.Text>
                            <div className="mt-auto">
                              {medicine.stocks && medicine.stocks.length > 0 ? (
                                <Button
                                  onClick={() => handleViewStock(medicine)}
                                  className="prod__button"
                                >
                                  View Stock
                                </Button>
                              ) : (
                                <p style={{ color: "red" }}>
                                  No stocks available for this medicine
                                </p>
                              )}
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p style={{ color: "red" }}>
                    No medicines found for this manufacturer
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="ms-3">
            <h3 className="mt-5">Recently Bought</h3>
            {medicineDetails ? (
              <div className="prod__medicine-details w-75">
                <Card className="prod__card mb-3">
                  <Card.Body>
                    <Card.Title>{medicineDetails.name}</Card.Title>
                    <Card.Text>
                      Medicine ID: {medicineDetails.medicine_id}
                    </Card.Text>
                    <Card.Text>No of Units: {quantityToBuy}</Card.Text>
                    <Card.Text>
                      Manufacturer: {medicineDetails.manufacturer}
                    </Card.Text>
                    <Card.Text>
                      Price per unit:{" "}
                      {convertWeiToBNB(selectedStockForBuy?.price)} BNB
                    </Card.Text>
                    <Card.Text>
                      Total Price:{" "}
                      {convertWeiToBNB(
                        selectedStockForBuy.price * quantityToBuy
                      )}{" "}
                      BNB
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ) : (
              <p style={{ color: "red" }}>No recent purchases</p>
            )}
          </div>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Stock Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedStock && selectedStock.length > 0 ? (
                selectedStock.map((stock) => (
                  <div key={stock.stock_id}>
                    <p>Stock ID: {stock.stock_id}</p>
                    <p>Price: {convertWeiToBNB(stock?.price)} BNB</p>
                    <p>Quantity: {stock.quantity}</p>
                    <p>
                      Manufacture Date:{" "}
                      {new Date(
                        parseInt(stock.manufacture_date)
                      ).toLocaleDateString()}
                    </p>
                    <p>
                      Expiry Date:{" "}
                      {new Date(
                        parseInt(stock.expiry_date)
                      ).toLocaleDateString()}
                    </p>
                    <Button
                      onClick={() => handleBuyStockClick(stock)}
                      className="prod__button"
                    >
                      Buy Stock
                    </Button>
                    <hr />
                  </div>
                ))
              ) : (
                <p>No stock information available</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showBuyModal} onHide={() => setShowBuyModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Buy Stock</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Stock ID: {selectedStockForBuy?.stock_id}</p>
              <p>
                Price: {convertWeiToBNB(selectedStockForBuy?.price ?? "0")} BNB
              </p>
              <p>Available Quantity: {selectedStockForBuy?.quantity}</p>
              <Form>
                <Form.Group controlId="quantityToBuy">
                  <Form.Label>Quantity to Buy</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    max={selectedStockForBuy?.quantity}
                    value={quantityToBuy}
                    onChange={(e) => setQuantityToBuy(Number(e.target.value))}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowBuyModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleBuyConfirm}>
                {buying ? "Loading..." : "Buy"}
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={showDescriptionModal}
            onHide={() => setShowDescriptionModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Medicine Description</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{fullDescription}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDescriptionModal(false)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </div>
  );
};

export default Products;
