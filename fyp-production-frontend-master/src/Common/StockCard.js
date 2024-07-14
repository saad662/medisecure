import moment from "moment";
import React from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";

const StockCard = ({ name, units, price, manDate, expiryDate }) => {
  return (
    <Card style={{ width: 300 }}>
      <CardImg
        className={"mt-3 mb-3"}
        style={{ objectFit: "contain" }}
        top
        width="150px"
        height="75px"
        src={require("../assets/images/logo.png")}
        alt="Card image cap"
      />
      <CardBody>
        <CardTitle>{name}</CardTitle>
        <CardSubtitle>Units: {units}</CardSubtitle>
        <CardSubtitle>Price: {price} BNB</CardSubtitle>
        <CardSubtitle>Manufacturing Date:</CardSubtitle>
        <CardText>{moment(manDate).format("MMMM Do YYYY, h:mm:ss a")}</CardText>
        <CardSubtitle>Expiry Date:</CardSubtitle>
        <CardText>
          {moment(expiryDate).format("MMMM Do YYYY, h:mm:ss a")}
        </CardText>
      </CardBody>
    </Card>
  );
};

export default StockCard;
