import React, { useState } from "react";
import "./MedForm.css";
import { Container, Dropdown } from "react-bootstrap";
import { addOrder } from "../../apis/authentication";

const Med_Form = () => {
  const [medicines] = useState([
    { Id: 1, Name: "Medicine A" },
    { Id: 2, Name: "Medicine B" },
  ]);

  const [products] = useState([
    { Id: 1, MedicineId: 1, Stock: 10 },
    { Id: 2, MedicineId: 2, Stock: 20 },
  ]);

  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [quantity, setQuantity] = useState(0);

  const submit_form = async () => {
    try {
      const selectedMed = medicines.find((med) => med.Name === selectedMedicine);
      const medId = selectedMed?.Id;
      const selectedProduct = products.find((product) => product.MedicineId === medId);
      const stockId = selectedProduct?.Id;

      if (!stockId) {
        throw new Error('Stock ID not found for the selected medicine.');
      }

      const response = await addOrder({
        stockId,
        customerId,
        purchasedUnits: quantity,
        status: "Accepted",
      });

      const order = await response.json();
      console.log(order, " order");
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <div className="MedForm-contact-sec3">
      <Container fluid="md">
        <div className="MedForm-inputs">
          <div className="MedForm-input-text1">ENTER THE MEDICINES THAT YOU SOLD.</div>
          <input
            className="MedForm-formin"
            type="text"
            name="userid"
            placeholder="User ID"
            onChange={(e) => setCustomerId(e.target.value)}
          />
          <Dropdown className="MedForm-formin-dropdown" onSelect={setSelectedMedicine}>
            <Dropdown.Toggle id="dropdown-basic" className="MedForm-dropdown">
              {selectedMedicine || "Available Medicines"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {medicines.map(({ Name }) => (
                <Dropdown.Item key={Name} eventKey={Name}>
                  {Name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <input
            className="MedForm-formin"
            type="number"
            name="quantity"
            placeholder="Quantity"
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <button className="MedForm-formin-btn" onClick={submit_form}>
            <span>Submit</span>
          </button>
          <div className="MedForm-input-text2"></div>
        </div>
      </Container>
    </div>
  );
};

export default Med_Form;