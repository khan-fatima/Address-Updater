import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: '',
    apartmentNo: '',
    street: '',
    locality: '',
    city: '',
    state: '',
    pincode: 0,
  });

  const [editingAddressId, setEditingAddressId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:2000/api/addresses')
      .then((response) => response.json())
      .then((data) => setAddresses(data))
      .catch((error) => console.error('Error fetching addresses:', error));
  }, []);

  const handleAddAddress = () => {
    if (editingAddressId) {
      handleUpdateAddress();
      return;
    }

    fetch('http://localhost:2000/api/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAddress),
    })
      .then((response) => response.json())
      .then((data) => {
        setAddresses([...addresses, data]);
        setNewAddress({
          name: '',
          apartmentNo: '',
          street: '',
          locality: '',
          city: '',
          state: '',
          pincode: 0,
        });
      })
      .catch((error) => console.error('Error adding address:', error));
  };

  const handleEditAddress = (addressId) => {
    const selectedAddress = addresses.find((address) => address._id === addressId);
    setNewAddress({ ...selectedAddress });
    setEditingAddressId(addressId);
  };

  const handleUpdateAddress = () => {
    fetch(`http://localhost:2000/api/addresses/${editingAddressId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAddress),
    })
      .then((response) => response.json())
      .then((updatedAddress) => {
        const updatedAddresses = addresses.map((address) =>
          address._id === editingAddressId ? updatedAddress : address
        );
        setAddresses(updatedAddresses);
        setNewAddress({
          name: '',
          apartmentNo: '',
          street: '',
          locality: '',
          city: '',
          state: '',
          pincode: 0,
        });
        setEditingAddressId(null);
      })
      .catch((error) => console.error('Error updating address:', error));
  };
  

  const handleDeleteAddress = (addressId) => {
    fetch(`http://localhost:2000/api/addresses/${addressId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setAddresses(addresses.filter((address) => address._id !== addressId));
      })
      .catch((error) => console.error('Error deleting address:', error));
  };

  return (
    <div className="App">
      <h1 className="title">Address Updater</h1>
      <form className="form">
      <div className="form-group">
          <label htmlFor="name" className="label">Name:</label>
          <input
            type="text"
            id="name"
            className="input"
            placeholder="Name"
            value={newAddress.name}
            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="apartmentNo" className="label">Apartment No:</label>
          <input
            type="text"
            id="apartmentNo"
            className="input"
            placeholder="Apartment No"
            value={newAddress.apartmentNo}
            onChange={(e) => setNewAddress({ ...newAddress, apartmentNo: e.target.value })}
          />
        </div>


<div className="form-group">
  <label htmlFor="street" className="label">Street:</label>
  <input
    type="text"
    id="street"
    className="input"
    placeholder="Street"
    value={newAddress.street}
    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
  />
</div>

<div className="form-group">
  <label htmlFor="locality" className="label">Locality:</label>
  <input
    type="text"
    id="locality"
    className="input"
    placeholder="Locality"
    value={newAddress.locality}
    onChange={(e) => setNewAddress({ ...newAddress, locality: e.target.value })}
  />
</div>

<div className="form-group">
  <label htmlFor="city" className="label">City:</label>
  <input
    type="text"
    id="city"
    className="input"
    placeholder="City"
    value={newAddress.city}
    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
  />
</div>

<div className="form-group">
  <label htmlFor="state" className="label">State:</label>
  <input
    type="text"
    id="state"
    className="input"
    placeholder="State"
    value={newAddress.state}
    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
  />
</div>

        <div className="form-group">
          <label htmlFor="pincode" className="label">Pincode:</label>
          <input
            type="number"
            id="pincode"
            className="input"
            placeholder="Pincode"
            value={newAddress.pincode}
            onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
          />
        </div>

        <button className="add-button" onClick={handleAddAddress}>
          {editingAddressId ? 'Update Address' : 'Add Address'}
        </button>
      </form>
      <ul className="address-list">
        {addresses.map((address) => (
          <li key={address._id} className="address-item">
            {address.name} : {address.apartmentNo}, {address.street}, {address.locality}, {address.city}, {address.state}, {address.pincode}
            <button className="edit-button" onClick={() => handleEditAddress(address._id)}>
              Edit
            </button>
            <button className="delete-button" onClick={() => handleDeleteAddress(address._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
