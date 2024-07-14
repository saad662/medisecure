import React, { Fragment, useEffect, useState } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Swal from "sweetalert2";
import loginAction from "../../actions/login";
import "./styles.scss";

const defaultFormData = {
  email: "",
  password: "",
};

const Login = ({ history, loginAction, user }) => {
  const [formData, setFormData] = useState(defaultFormData);

  const submitForm = (e) => {
    e.preventDefault();
    console.log("login");
    login();
  };

  const goToRegister = () => {
    history.push("/register");
  };

  const onInput = (e, key) => {
    const value = e.target.value;
    setFormData({ ...formData, [key]: value });
  };

  const login = () => {
    console.log(formData, "formData");
    loginAction(formData, (res) => {
      console.log(res, "response in login");
      Swal.fire({
        title: res.error ? "Error" : "Success",
        text: res.message,
        icon: res.error ? "error" : "success",
        confirmButtonText: "Ok",
      }).then(() => {
        if (!res.error) {
          history.push("/dashboard");
        }
      });
    });
  };

  const { email, password } = formData;
  useEffect(() => {
    if (user) {
      history.push("/dashboard");
    }
  }, [user, history]);

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
        <div className="logo-div">
          <img className="logo" src={require("../../assets/images/logo.png")} />
        </div>
        <div>
          <p className="subtitle">FOR PRODUCTIONS</p>
        </div>
        <Card className="login-card mb-3 pt-2 pb-2">
          <CardBody>
            <CardTitle>Login</CardTitle>
            <Form onSubmit={submitForm}>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      value={email}
                      onChange={(e) => onInput(e, "email")}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      value={password}
                      onChange={(e) => onInput(e, "password")}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup check>
                <Input type="checkbox" name="check" id="exampleCheck" />
                <Label for="exampleCheck" check>
                  Remember me
                </Label>
              </FormGroup>
              <Button color="primary" className="mt-2 w-100" onClick={login}>
                Sign in
              </Button>
            </Form>
            <div className="d-flex flex-column justify-content-center align-items-center mt-2">
              <p>OR</p>
              <Button onClick={goToRegister} color="secondary" className="mt-2">
                Register Yourself
              </Button>
            </div>
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

const mapDispatchToProps = {
  loginAction: loginAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
