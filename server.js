const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 2000;

mongoose.connect('mongodb+srv://fatimakhan:7wIImHaPCK3molYx@cluster0.senoo0v.mongodb.net/?retryWrites=true&w=majority', {   
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const addressSchema = new mongoose.Schema({
  name: String,
  apartmentNo: String,
  street: String,
  town: String,
  city: String,
  state: String,
  pincode: Number,
});

const Address = mongoose.model('Address', addressSchema);

app.use(bodyParser.json());    
app.use(cors());      

app.post('/api/addresses', async (req, res) => {
  const { name, apartmentNo, street, town, city, state, pincode } = req.body;
  

  const newAddress = new Address({ name, apartmentNo, street, town, city, state, pincode });
  console.log(newAddress);
  try {
    const savedAddress = await newAddress.save();
    res.json(savedAddress);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/addresses', async (req, res) => {
  try {
    const allAddresses = await Address.find();
    res.json(allAddresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/addresses/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await Address.findByIdAndDelete(id);
    res.json({ message: 'Address deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/addresses/:id', async (req, res) => {
  const id = req.params.id;
  const { name, apartmentNo, street, town, city, state, pincode } = req.body;

  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      { name, apartmentNo, street, town, city, state, pincode },
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ error: 'Address not found' });
    }

    console.log('Updated Address:', updatedAddress);
    res.json(updatedAddress);
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
