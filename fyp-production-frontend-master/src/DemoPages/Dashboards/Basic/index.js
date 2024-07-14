import React, { Component, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import classnames from "classnames";
import Web3 from "web3";
import {
  Row,
  Col,
  Button,
  CardHeader,
  Card,
  CardBody,
  Progress,
  TabContent,
  TabPane,
} from "reactstrap";
import PageTitle from "../../../Layout/AppMain/PageTitle";
import { connect } from "react-redux";
import { getDistributorOrdersAction } from "../../../actions/getDistributorOrders";
import { getStocksAction } from "../../../actions/stocks";
import MedisecureABI from "../../../MedisecureABI.json"; // Adjust the path as needed

import {
  AreaChart,
  Area,
  Line,
  ResponsiveContainer,
  Bar,
  ComposedChart,
  CartesianGrid,
  Tooltip,
  LineChart,
} from "recharts";

import {
  faAngleUp,
  faArrowRight,
  faArrowLeft,
  faAngleDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Page C", uv: 2000, pv: 6800, amt: 2290 },
  { name: "Page D", uv: 4780, pv: 7908, amt: 2000 },
  { name: "Page E", uv: 2890, pv: 9800, amt: 2181 },
  { name: "Page F", uv: 1390, pv: 3800, amt: 1500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

const data2 = [
  { name: "Page A", uv: 5400, pv: 5240, amt: 1240 },
  { name: "Page B", uv: 7300, pv: 4139, amt: 3221 },
  { name: "Page C", uv: 8200, pv: 7980, amt: 5229 },
  { name: "Page D", uv: 6278, pv: 4390, amt: 3200 },
  { name: "Page E", uv: 3189, pv: 7480, amt: 6218 },
  { name: "Page D", uv: 9478, pv: 6790, amt: 2200 },
  { name: "Page E", uv: 1289, pv: 1980, amt: 7218 },
  { name: "Page F", uv: 3139, pv: 2380, amt: 5150 },
  { name: "Page G", uv: 5349, pv: 3430, amt: 3210 },
];

class AnalyticsDashboard1 extends Component {
  constructor() {
    super();

    this.state = {
      dropdownOpen: false,
      activeTab1: "11",
      totalStocks: 0,
      soldStocks: 0,
      remainingStocks: 0,
      totalOrders: 0,
    };

    this.toggle = this.toggle.bind(this);
    this.toggle1 = this.toggle1.bind(this);
  }

  componentDidMount() {
    this.initWeb3();
  }

  async initWeb3() {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      this.web3 = web3;
      this.account = accounts[0];
      this.contract = new web3.eth.Contract(
        MedisecureABI,
        "0xb93746FfC6eb1D679365680E9f4C54f3394a53e5" // Replace with your contract address
      );
      this.fetchDashboardData(this.props.user.name);
    } else {
      console.error("No Ethereum provider found. Install MetaMask.");
    }
  }

  async fetchDashboardData(manufacturer) {
    console.log("MAN", manufacturer);
    try {
      const totalStocks = await this.contract.methods
        .getTotalNumberOfStocks(manufacturer)
        .call();
      const totalSoldStocks = await this.contract.methods
        .getTotalNumberOfSoldStocks(manufacturer)
        .call();
      const remainingStocks = await this.contract.methods
        .getRemainingStocks(manufacturer)
        .call();
      const totalOrders = await this.contract.methods
        .getTotalNumberOfOrdersCreated(manufacturer)
        .call();

      this.setState({
        totalStocks: parseInt(totalStocks, 10),
        soldStocks: parseInt(totalSoldStocks, 10),
        remainingStocks: parseInt(remainingStocks, 10),
        totalOrders: parseInt(totalOrders, 10),
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }

  toggle() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  toggle1(tab) {
    if (this.state.activeTab1 !== tab) {
      this.setState({
        activeTab1: tab,
      });
    }
  }

  render() {
    const {
      pending,
      accepted,
      rejected,
      orders,
      totalStocks,
      soldStocks,
      remainingStocks,
      totalOrders,
    } = this.state;
    const { user } = this.props;
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div>
            <PageTitle
              heading={`Hello, ${user.ownerName}`}
              subheading="This is the dashboard for monitoring your inventory and orders"
              icon="pe-7s-car icon-gradient bg-mean-fruit"
            />
            <Row>
              <Col md="12" lg="6">
                <Card className="mb-3">
                  <CardHeader className="card-header-tab">
                    <div className="card-header-title">
                      <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure">
                        {" "}
                      </i>
                      Orders Reports
                    </div>
                    <div className="btn-actions-pane-right">
                      <Button
                        outline
                        className={
                          "border-0 btn-pill btn-wide btn-transition " +
                          classnames({ active: this.state.activeTab1 === "11" })
                        }
                        color="primary"
                        onClick={() => {
                          this.toggle1("11");
                        }}
                      >
                        Tab 1
                      </Button>
                      <Button
                        outline
                        className={
                          "ml-1 btn-pill btn-wide border-0 btn-transition " +
                          classnames({ active: this.state.activeTab1 === "22" })
                        }
                        color="primary"
                        onClick={() => {
                          this.toggle1("22");
                        }}
                      >
                        Tab 2
                      </Button>
                    </div>
                  </CardHeader>
                  <TabContent activeTab={this.state.activeTab1}>
                    <TabPane tabId="11">
                      <CardBody className="pt-2">
                        <Row className="mt-3">
                          <Col md="6">
                            <div className="widget-content">
                              <div className="widget-content-outer">
                                <div className="widget-content-wrapper">
                                  <div className="widget-content-left mr-3"></div>
                                  <div className="widget-content-right">
                                    <div className="text-muted opacity-6">
                                      Total Orders
                                    </div>
                                  </div>
                                </div>
                                <div className="widget-progress-wrapper mt-1">
                                  <Progress
                                    className="progress-bar-sm progress-bar-animated-alt"
                                    color="danger"
                                    value="63"
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="widget-content">
                              <div className="widget-content-outer">
                                <div className="widget-content-wrapper">
                                  <div className="widget-content-left mr-3">
                                    <div className="widget-numbers fsize-3 text-muted">
                                      {accepted}
                                    </div>
                                  </div>
                                  <div className="widget-content-right">
                                    <div className="text-muted opacity-6">
                                      Accepted Orders
                                    </div>
                                  </div>
                                </div>
                                <div className="widget-progress-wrapper mt-1">
                                  <Progress
                                    className="progress-bar-sm progress-bar-animated-alt"
                                    color="success"
                                    value="32"
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <div className="divider mt-4" />
                        <Row>
                          <Col md="6">
                            <div className="widget-content">
                              <div className="widget-content-outer">
                                <div className="widget-content-wrapper">
                                  <div className="widget-content-left mr-3">
                                    <div className="widget-numbers fsize-3 text-muted">
                                      {pending}
                                    </div>
                                  </div>
                                  <div className="widget-content-right">
                                    <div className="text-muted opacity-6">
                                      Pending Orders
                                    </div>
                                  </div>
                                </div>
                                <div className="widget-progress-wrapper mt-1">
                                  <Progress
                                    className="progress-bar-sm progress-bar-animated-alt"
                                    color="primary"
                                    value="71"
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="widget-content">
                              <div className="widget-content-outer">
                                <div className="widget-content-wrapper">
                                  <div className="widget-content-left mr-3">
                                    <div className="widget-numbers fsize-3 text-muted">
                                      {rejected}
                                    </div>
                                  </div>
                                  <div className="widget-content-right">
                                    <div className="text-muted opacity-6">
                                      Rejected Orders
                                    </div>
                                  </div>
                                </div>
                                <div className="widget-progress-wrapper mt-1">
                                  <Progress
                                    className="progress-bar-sm progress-bar-animated-alt"
                                    color="warning"
                                    value="41"
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                      <div className="widget-chart p-0">
                        <div className="widget-chart-content">
                          <div className="widget-description mt-0 text-warning">
                            <FontAwesomeIcon icon={faArrowLeft} />
                            <span className="pl-1">175.5%</span>
                            <span className="text-muted opacity-8 pl-1">
                              Order's trend
                            </span>
                          </div>
                        </div>
                        <ResponsiveContainer height={187}>
                          <AreaChart
                            data={data}
                            margin={{ top: -45, right: 0, left: 0, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient
                                id="colorPv2"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="10%"
                                  stopColor="var(--warning)"
                                  stopOpacity={0.7}
                                />
                                <stop
                                  offset="90%"
                                  stopColor="var(--warning)"
                                  stopOpacity={0}
                                />
                              </linearGradient>
                            </defs>
                            <Tooltip />
                            <Area
                              type="monotoneX"
                              dataKey="uv"
                              stroke="var(--warning)"
                              strokeWidth={2}
                              fillOpacity={1}
                              fill="url(#colorPv2)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </TabPane>
                    <TabPane tabId="22">
                      <div className="widget-chart p-0">
                        <ResponsiveContainer height={179}>
                          <ComposedChart data={data2}>
                            <CartesianGrid stroke="#ffffff" />
                            <Area
                              type="monotone"
                              dataKey="amt"
                              fill="#f7ffd0"
                              stroke="#85a200"
                            />
                            <Bar
                              dataKey="pv"
                              barSize={16}
                              fill="var(--primary)"
                            />
                            <Line
                              type="monotone"
                              dataKey="uv"
                              strokeWidth="3"
                              stroke="var(--danger)"
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                        <div className="widget-chart-content mt-3 mb-2">
                          <div className="widget-description mt-0 text-success">
                            <FontAwesomeIcon icon={faArrowUp} />
                            <span className="pl-2 pr-2">37.2%</span>
                            <span className="text-muted opacity-8">
                              performance increase
                            </span>
                          </div>
                        </div>
                      </div>
                      <CardBody className="pt-2">
                        <Row>
                          <Col md="6">
                            <div className="widget-content">
                              <div className="widget-content-outer">
                                <div className="widget-content-wrapper">
                                  <div className="widget-content-left mr-3">
                                    <div className="widget-numbers fsize-3 text-muted">
                                      23%
                                    </div>
                                  </div>
                                  <div className="widget-content-right">
                                    <div className="text-muted opacity-6">
                                      Deploys
                                    </div>
                                  </div>
                                </div>
                                <div className="widget-progress-wrapper mt-1">
                                  <Progress
                                    className="progress-bar-sm progress-bar-animated-alt"
                                    color="warning"
                                    value="23"
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="widget-content">
                              <div className="widget-content-outer">
                                <div className="widget-content-wrapper">
                                  <div className="widget-content-left mr-3">
                                    <div className="widget-numbers fsize-3 text-muted">
                                      76%
                                    </div>
                                  </div>
                                  <div className="widget-content-right">
                                    <div className="text-muted opacity-6">
                                      Traffic
                                    </div>
                                  </div>
                                </div>
                                <div className="widget-progress-wrapper mt-1">
                                  <Progress
                                    className="progress-bar-sm progress-bar-animated-alt"
                                    color="info"
                                    value="76"
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <div className="divider mt-4" />
                        <Row>
                          <Col md="6">
                            <div className="widget-content">
                              <div className="widget-content-outer">
                                <div className="widget-content-wrapper">
                                  <div className="widget-content-left mr-3">
                                    <div className="widget-numbers fsize-3 text-muted">
                                      83%
                                    </div>
                                  </div>
                                  <div className="widget-content-right">
                                    <div className="text-muted opacity-6">
                                      Servers Load
                                    </div>
                                  </div>
                                </div>
                                <div className="widget-progress-wrapper mt-1">
                                  <Progress
                                    className="progress-bar-sm progress-bar-animated-alt"
                                    color="danger"
                                    value="83"
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="widget-content">
                              <div className="widget-content-outer">
                                <div className="widget-content-wrapper">
                                  <div className="widget-content-left mr-3">
                                    <div className="widget-numbers fsize-3 text-muted">
                                      48%
                                    </div>
                                  </div>
                                  <div className="widget-content-right">
                                    <div className="text-muted opacity-6">
                                      Reported Bugs
                                    </div>
                                  </div>
                                </div>
                                <div className="widget-progress-wrapper mt-1">
                                  <Progress
                                    className="progress-bar-sm progress-bar-animated-alt"
                                    color="alternate"
                                    value="48"
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </TabPane>
                  </TabContent>
                </Card>
              </Col>
              <Col md="12" lg="6">
                <Row>
                  <Col md="6">
                    <div className="card mb-3 bg-arielle-smile widget-chart text-black card-border">
                      <div className="icon-wrapper rounded-circle">
                        <div className="icon-wrapper-bg bg-white opacity-10" />
                        <i className="lnr-cog icon-gradient bg-arielle-smile" />
                      </div>
                      <div className="widget-numbers text-white">
                        {totalStocks} Units
                      </div>
                      <div
                        className="widget-subheading"
                        style={{ color: "black !important" }}
                      >
                        Total Stocks
                      </div>
                      <div className="widget-description text-white">
                        <FontAwesomeIcon icon={faAngleUp} />
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="card mb-3 bg-midnight-bloom widget-chart text-white card-border">
                      <div className="icon-wrapper rounded">
                        <div className="icon-wrapper-bg bg-white opacity-10" />
                        <i className="lnr-screen icon-gradient bg-warm-flame" />
                      </div>
                      <div className="widget-numbers">{soldStocks} Units</div>
                      <div className="widget-subheading">Sold Stocks</div>
                      <div className="widget-description text-white">
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="card mb-3 bg-grow-early widget-chart text-white card-border">
                      <div className="icon-wrapper rounded">
                        <div className="icon-wrapper-bg bg-dark opacity-9" />
                        <i className="lnr-graduation-hat text-white" />
                      </div>
                      <div className="widget-numbers">{totalOrders}</div>
                      <div className="widget-subheading">Total Orders Made</div>
                      <div className="widget-description text-white">
                        <FontAwesomeIcon icon={faArrowRight} />
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="card mb-3 bg-love-kiss widget-chart card-border">
                      <div className="widget-chart-content text-white">
                        <div className="icon-wrapper rounded-circle">
                          <div className="icon-wrapper-bg bg-white opacity-4" />
                          <i className="lnr-cog" />
                        </div>
                        <div className="widget-numbers">
                          {remainingStocks} Units
                        </div>
                        <div className="widget-subheading">
                          Remaining Stocks
                        </div>
                        <div className="widget-description">
                          <FontAwesomeIcon
                            className="text-white opacity-5"
                            icon={faAngleUp}
                          />
                        </div>
                      </div>
                      <div className="widget-chart-wrapper">
                        <ResponsiveContainer width="100%" aspect={3.0 / 1.0}>
                          <LineChart
                            data={data}
                            margin={{ top: 0, right: 5, left: 5, bottom: 0 }}
                          >
                            <Line
                              type="monotone"
                              dataKey="pv"
                              stroke="#ffffff"
                              strokeWidth={3}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ Register, Login, DistributorOrders }) => ({
  isLoading: Register.isLoading,
  error: Register.error,
  user: Login.user,
  distributorOrders: DistributorOrders.distributorOrders,
});

const mapDispatchToProps = {
  getDistributorOrdersAction: getDistributorOrdersAction,
  getStocksAction: getStocksAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnalyticsDashboard1);
