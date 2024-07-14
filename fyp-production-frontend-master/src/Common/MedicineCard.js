import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import "./MedicineCard.css";

const MedicineCard = ({
  name,
  description,
  category,
  formula,
  antibiotic,
  goToAddStocks = () => {},
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <Card className="medicine-card">
      <CardImg
        className="medicine-image"
        top
        src={require("../assets/images/logo.png")}
        alt="Card image cap"
      />
      <CardBody className="medicine-body">
        <CardTitle className="medicine-title">{name}</CardTitle>
        <CardSubtitle className="medicine-subtitle">
          {antibiotic ? "Antibiotic" : "Non-Antibiotic"} - {category} -{" "}
          {formula}
        </CardSubtitle>
        <CardText className="medicine-description">
          {showFullDescription ? description : description.slice(0, 100)}
          {description && description.length > 100 && (
            <span onClick={toggleDescription} className="toggle-description">
              {showFullDescription ? " Less" : "... More"}
            </span>
          )}
        </CardText>
        <Button className="add-stocks-button" onClick={goToAddStocks}>
          Add Stocks
        </Button>
      </CardBody>
    </Card>
  );
};

export default MedicineCard;
