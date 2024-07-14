import React, { Fragment } from "react";
import { Button, UncontrolledTooltip } from "reactstrap";
import { Bounce, toast } from "react-toastify";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import logoutAction from "../../../actions/logout";

class UserBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  notify2 = () =>
    (this.toastId = toast(
      "You don't have any new items in your calendar for today! Go out and play!",
      {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: "bottom-center",
        type: "success",
      }
    ));

  logout = () => {
    this.props.logoutAction(() => {
      window.localStorage.clear();
      this.props.history.push("/login");
    });
  };

  render() {
    const { user } = this.props;

    // Check if user is not null and has the expected properties
    const userName = user && (user.ownerName || user.name);
    const userEmail = user && user.email;

    return (
      <Fragment>
        <div className="header-btn-lg pr-0">
          <div className="widget-content p-0">
            <div className="widget-content-wrapper">
              <div className="widget-content-left"></div>
              <div className="widget-content-left  ml-3 header-user-info">
                <div className="widget-heading">
                  {userName || "Unknown User"}
                </div>
                <div className="widget-subheading">
                  {userEmail || "No email available"}
                </div>
              </div>
              <div className="widget-content-right header-user-info ml-3">
                <Button
                  className="btn-shadow p-1"
                  size="sm"
                  onClick={this.logout}
                  color="info"
                  id="Tooltip-1"
                >
                  <FontAwesomeIcon className="mr-2 ml-2" icon={faSignOutAlt} />
                </Button>
                <UncontrolledTooltip placement="bottom" target={"Tooltip-1"}>
                  Logout
                </UncontrolledTooltip>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ Register, Login }) => ({
  isLoading: Register.isLoading,
  error: Register.error,
  user: Login.user,
});

const mapDispatchToProps = {
  logoutAction: logoutAction,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserBox));
