import React, { useState, useEffect } from 'react';
import './BuyMed.css';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Buy_Med = ({ productId }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  const hardcodedProducts = [
    {
      _id: 1,
      expiryDate: new Date(),
      manDate: new Date(),
      medicine: {
        _id: 1,
        name: 'Medicine 1',
        description: 'Description of Medicine 1',
      },
      units: 10,
    },
    {
      _id: 2,
      expiryDate: new Date(),
      manDate: new Date(),
      medicine: {
        _id: 2,
        name: 'Medicine 2',
        description: 'Description of Medicine 2',
      },
      units: 20,
    },
    {
      _id: 3,
      expiryDate: new Date(),
      manDate: new Date(),
      medicine: {
        _id: 3,
        name: 'Medicine 3',
        description: 'Description of Medicine 3',
      },
      units: 15,
    },
  ];

  useEffect(() => {
    console.log('Selected product ID:', productId);
  }, [productId]);

  const selectedProduct = hardcodedProducts.find(product => product._id === parseInt(productId));

  useEffect(() => {
    console.log('Selected product:', selectedProduct);
  }, [selectedProduct]);

  const addStockToDatabase = () => {
    console.log('User ID:', userId);
    console.log('Selected Product:', selectedProduct);
    if (userId && selectedProduct) {
      const date = new Date();
      const formData = {
        distributor: userId,
        qty: parseInt(quantity),
        createdAt: date,
        production: selectedProduct._id,
        productionStock: selectedProduct.medicine._id,
        status: "Pending"
      };

      console.log("Stock added:", formData);
      navigate('/dashboard');
    } else {
      console.error("User or product not found");
      navigate('/dashboard');
    }
  };

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className='buyMed-contact-sec3'>
      <Container fluid="md">
        <div className='buyMed-inputs'>
          <div className='buyMed-input-text1'>Enter the Quantity of {selectedProduct.medicine.name}.</div>
          <input
            className='buyMed-formin'
            type='number'
            name='quantity'
            placeholder='Quantity'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button className='buyMed-formin-btn' onClick={addStockToDatabase}>
            <span>Submit</span>
          </button>
          <div className='buyMed-input-text2'></div>
        </div>
      </Container>
    </div>
  );
};

export default Buy_Med;