const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define the schema for incidents
const incidentSchema = new mongoose.Schema({
    title: String,
    description: String,
    city: String,
    state: String,
    pincode: Number,
    incidentType: String,
    otherType: String,
});

const Incident = mongoose.model('Incident', incidentSchema);

// Define the route to handle form submissions
app.post('/api/incidents', (req, res) => {
    const incident = new Incident(req.body);
    incident.save()
        .then(() => res.status(201).send('Incident added successfully!'))
        .catch(err => res.status(400).send('Error adding incident: ' + err));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
