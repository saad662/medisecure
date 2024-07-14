import React, { Fragment, useEffect, useState } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from "reactstrap";
import Swal from "sweetalert2";
import Web3 from "web3";
import MedisecureABI from "../../../MedisecureABI.json";

const defaultFormData = {
  medicine_id: "",
  name: "",
  description: "",
  category: "",
  manufacturer: "",
  formula: "",
  antibiotic: "",
  chemicals: "",
};

let account;

const AddMedicine = ({ user, history }) => {
  const [formData, setFormData] = useState({
    ...defaultFormData,
    manufacturer: user ? user.name : "",
  });
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);

  const initWeb3 = async () => {
    try {
      if (window.ethereum) {
        try {
          account = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          console.log(account);
          const web3 = new Web3(window.ethereum);
          const contractAddress = "0xb93746FfC6eb1D679365680E9f4C54f3394a53e5";
          console.log(web3.utils.toChecksumAddress(contractAddress));
          // Validate the contract address format
          if (!web3.utils.isAddress(contractAddress)) {
            throw new Error(`Provided address ${contractAddress} is invalid.`);
          }

          const contractInstance = new web3.eth.Contract(
            MedisecureABI,
            contractAddress
          );
          setWeb3(web3);
          setContract(contractInstance);
        } catch (error) {
          console.error("Error requesting accounts: ", error);
          Swal.fire({
            title: "Error",
            text: `Failed to request accounts: ${error.message}`,
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      } else {
        throw new Error("No Ethereum provider found. Install MetaMask.");
      }
    } catch (error) {
      console.error("Error initializing Web3: ", error);
      Swal.fire({
        title: "Error",
        text: `Failed to initialize Web3: ${error.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  useEffect(() => {
    initWeb3();
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
  };

  const onInput = (e, key) => {
    const value = e.target.value;
    const data = { ...formData };
    data[key] = value;
    setFormData(data);
  };

  const antibioticToggle = (value) => {
    const data = { ...formData };
    data["antibiotic"] = value;
    setFormData(data);
  };

  const createMedicine = async () => {
    console.log(formData);

    if (
      !formData.medicine_id ||
      !formData.description ||
      !formData.antibiotic ||
      !formData.category ||
      !formData.formula ||
      !formData.name ||
      !formData.chemicals
    ) {
      Swal.fire({
        title: "Missing Inputs",
        text: "Please fill all the fields.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }

    console.log(formData);
    if (!contract) {
      Swal.fire({
        title: "Error",
        text: "Contract is not initialized properly.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const data = { ...formData };
    const chemicals = data.chemicals
      ? data.chemicals.split(",").map((e) => e.trim())
      : [];
    data.chemicals = chemicals.join(",");

    try {
      setLoading(true);
      await contract.methods
        .add_medicine(
          data.medicine_id,
          data.name,
          data.description,
          data.manufacturer,
          data.category,
          data.formula,
          data.chemicals,
          data.antibiotic
        )
        .send({ from: account[0] });
      setLoading(false);
      Swal.fire({
        title: "Success",
        text: "Medicine created successfully",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        history.push("/medicine");
      });
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: "Error",
        text: `Failed to create medicine: ${error.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const {
    medicine_id,
    name,
    description,
    category,
    manufacturer,
    formula,
    antibiotic,
    chemicals,
  } = formData;

  return (
    <Fragment>
      <ReactCSSTransitionGroup
        className="login-page"
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Card className="login-card mb-3 pt-2 pb-2">
          <CardBody>
            <CardTitle>Create Medicine</CardTitle>
            <CardSubtitle>
              Wooho! New Medicine for your Inventory? Add it right away.
            </CardSubtitle>
            <Form onSubmit={submitForm}>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="id">ID</Label>
                    <Input
                      value={medicine_id}
                      onChange={(e) => onInput(e, "medicine_id")}
                      type="text"
                      name="medicine_id"
                      id="medicine_id"
                      placeholder="Enter Medicine ID"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      value={name}
                      onChange={(e) => onInput(e, "name")}
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Medicine Name"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                      value={description}
                      onChange={(e) => onInput(e, "description")}
                      type="textarea"
                      name="description"
                      id="description"
                      placeholder="Enter Description"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="category">Category</Label>
                    <Input
                      value={category}
                      onChange={(e) => onInput(e, "category")}
                      type="text"
                      name="category"
                      id="category"
                      placeholder="Enter Category"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="formula">Formula</Label>
                    <Input
                      value={formula}
                      onChange={(e) => onInput(e, "formula")}
                      type="text"
                      name="formula"
                      id="formula"
                      placeholder="Enter Formula"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup tag="fieldset" row>
                <legend className="col-form-label col-sm-2">
                  Medicine Type
                </legend>
                <Col md={6}>
                  <FormGroup check>
                    <Label check>
                      <Input
                        checked={antibiotic === "antibiotic"}
                        onChange={(e) => antibioticToggle("antibiotic")}
                        type="radio"
                        name="medicineType"
                      />{" "}
                      Antibiotic
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        checked={antibiotic === "non-antibiotic"}
                        onChange={(e) => antibioticToggle("non-antibiotic")}
                        type="radio"
                        name="medicineType"
                      />{" "}
                      Non-Antibiotic
                    </Label>
                  </FormGroup>
                </Col>
              </FormGroup>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="chemicals">Enter Chemicals</Label>
                    <Input
                      value={chemicals}
                      onChange={(e) => onInput(e, "chemicals")}
                      placeholder="Enter all chemicals used in production of this medicine"
                      type="textarea"
                      name="chemicals"
                      id="chemicals"
                    />
                    <FormText color="muted">
                      Enter all chemicals name separated by comma (,)
                    </FormText>
                  </FormGroup>
                </Col>
              </Row>
              <div className="d-flex justify-content-end align-items-center">
                <Button
                  onClick={createMedicine}
                  color="primary"
                  className="mt-2"
                >
                  {loading ? "Loading..." : "Create Medicine"}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

const mapStateToProps = ({ Register, Login }) => ({
  isLoading: Register.isLoading,
  error: Register.error,
  user: Login.user,
});

export default connect(mapStateToProps)(AddMedicine);
