import React, { Fragment, useState } from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Col, Row, Card, CardBody,
    CardTitle, Button, Form, FormGroup, Label, Input
} from 'reactstrap';
import register from "../../actions/register";
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import { Spinner } from "react-bootstrap";
import CustomButton from "../../Common/Button";
import "./styles.scss";
import { useEffect } from "react";
const defaultFormData = {
    email: "hafizsameed42@gmail.com",
    password: "12345",
    address: "address",
    city: "city",
    country: "country",
    zip: "1234",
    phone: "phone",
    license: "lice1111nse1",
    ownerName: "ownerName",
    name: "name"
}
const Register = ({ history, registerAction, isLoading, error }) => {
    const [formData, setFormData] = useState(defaultFormData);

    const goToLogin = () => {
        history.push("/login")
    };
    const onInput = (e, key) => {
        var value = e.target.value;
        var data = { ...formData };
        data[key] = value;
        setFormData(data);
    };
    const register = () => {
        console.log(formData, 'formData');
        registerAction(formData, (res) => {
            console.log(res, 'res');
            if (res) {
                Swal.fire({
                    title: 'Success',
                    text: 'Your Production account has been created successfully!',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                }).then(() => {
                    history.push("/login");
                })
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong',
                    icon: 'error',
                })
            }
        });
    }
    useEffect(() => {

    }, [formData]);
    const {
        email,
        password,
        address,
        city,
        country,
        zip,
        phone,
        license,
        name,
        ownerName
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
                transitionLeave={false}>
                <div className="logo-div">
                    <img
                        className="logo"
                        src={require("../../assets/images/logo.png")} />
                </div>
                <Card className="login-card mb-3">
                    <CardBody>
                        <CardTitle>SignUp</CardTitle>
                        <Form onSubmit={(e) => e.preventDefault()}>
                            <FormGroup>
                                <Label for="exampleAddress">Production Name</Label>
                                <Input value={name} onChange={(e) => onInput(e, "name")} type="text" name="name" id="name"
                                    placeholder="Enter Name of your production company" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleAddress">Owner's Name</Label>
                                <Input value={ownerName} onChange={(e) => onInput(e, "ownerName")} type="text" name="ownerName" id="ownerName"
                                    placeholder="Enter Owner's Name" />
                            </FormGroup>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleEmail11">Email</Label>
                                        <Input value={email} onChange={(e) => onInput(e, "email")} type="email" name="email" id="exampleEmail11"
                                            placeholder="Enter Email" />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="examplePassword11">Password</Label>
                                        <Input value={password} onChange={(e) => onInput(e, "password")} type="password" name="password" id="examplePassword11"
                                            placeholder="Enter Password" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label for="exampleAddress">Address</Label>
                                <Input value={address} onChange={(e) => onInput(e, "address")} type="text" name="address" id="exampleAddress"
                                    placeholder="1234 Main St" />
                            </FormGroup>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleCity">City</Label>
                                        <Input value={city} onChange={(e) => onInput(e, "city")} type="text" name="city" id="exampleCity" />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="exampleState">Country</Label>
                                        <Input value={country} onChange={(e) => onInput(e, "country")} type="text" name="country" id="exampleState" />
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <Label for="exampleZip">Zip</Label>
                                        <Input value={zip} onChange={(e) => onInput(e, "zip")} type="text" name="zip" id="exampleZip" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleEmail11">Phone No.</Label>
                                        <Input value={phone} onChange={(e) => onInput(e, "phone")} type="email" name="email" id="exampleEmail11"
                                            placeholder="Enter Phone No." />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="examplePassword11">License Id</Label>
                                        <Input value={license} onChange={(e) => onInput(e, "license")} type="text" name="license" id="license"
                                            placeholder="Enter License Id" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-center align-items-center mt-2">
                                <CustomButton loading={isLoading} onClick={register} color="primary" className="mt-2 w-50">Register</CustomButton>
                            </div>
                        </Form>
                        <div className="d-flex flex-column justify-content-center align-items-center mt-2">
                            <p>
                                OR
                            </p>
                            <Button onClick={goToLogin} color="secondary" className="mt-2">Sign In</Button>
                        </div>
                    </CardBody>
                </Card>
            </ReactCSSTransitionGroup>
        </Fragment>
    )
};

const mapStateToProps = ({ Register }) => ({
    isLoading: Register.isLoading,
    error: Register.error,
});

const mapDispatchToProps = {
    registerAction: register

};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Register);