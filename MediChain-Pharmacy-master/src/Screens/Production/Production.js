import React, { useState } from 'react';
import './Production.css';
import { Card, CardGroup, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import BuyMed from '../BuyMed/BuyMed';

const Production = () => {
  const { _id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const products = [
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

  const filteredProducts = _id ? products.filter(product => product.medicine._id === parseInt(_id)) : [];

  const handleShowModal = (productId) => {
    setSelectedProductId(productId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProductId(null);
  };

  return (
    <div className='production__container'>
      <div className='production__header-container'>
        <h1 className='production__header'>Production Details</h1>
      </div>
      {filteredProducts.length > 0 ? (
        filteredProducts.map(({ _id, expiryDate, manDate, medicine, units }) => (
          <CardGroup key={_id} className='production__card-group'>
            <Card className='production__card'>
              <Card.Body>
                <Card.Title className='production__title'>{medicine.name}</Card.Title>
                <Card.Text className='production__text'>{medicine.description}</Card.Text>
                <Card.Text className='production__text'>Units Available: {units}</Card.Text>
                <Card.Text className='production__text'>Manufacturing Date: {moment(manDate).format("MMM Do YYYY")}</Card.Text>
                <Card.Text className='production__text'>Expiry Date: {moment(expiryDate).format("MMM Do YYYY")}</Card.Text>
                <button
                  className='prod__button'
                  onClick={() => handleShowModal(_id)}
                >
                  See Medicines
                </button>
              </Card.Body>
            </Card>
          </CardGroup>
        ))
      ) : (
        <p>No products found</p>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Buy Medicine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BuyMed productId={selectedProductId} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Production;