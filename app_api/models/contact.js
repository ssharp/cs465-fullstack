const mongoose = require('mongoose');

// Define the contact schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    tag: { type: String, required: true, set: v => v.toUpperCase() }, // Store tag in uppercase
    message: { type: String, required: true }
});

module.exports = mongoose.model('contacts', contactSchema);