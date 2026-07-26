const mongoose = require('mongoose');
const Contact = require('../models/contact.js');
const Model = require('../models/contact.js');

// Handles form submission (POST)
const submitMessage = async (req, res) => {
    try {
        const { name, email, tag, message } = req.body;

        const newMessage = new Model({
            name,
            email,
            tag: tag.toUpperCase(), // Convert tag to uppercase for consistency
            message
        });

        await newMessage.save();

        // Redirect to the success page
        return res.redirect('/contact/success');

    } catch (err) {
        console.error(err);
        return res.status(500).send("Error saving message.");
    }
};

// GET /api/contacts
const readALLContacts = async (req, res) => {
    try {
        const q = await Model.find({}).exec();

        if (!q || q.length === 0) {
            return res.status(404).json({ message: "No contact messages found" });
        }

        return res.status(200).json(q);

    } catch (err) {
        return res.status(500).json({ message: "Error occurred while fetching contact messages" });
    }
};

// DELETE /api/contact/:id
const deleteContact = async (req, res) => {
    console.log("Delete request for ID:", req.params.id);
  try {
    const id = req.params.id;
    const deleted = await Model.findByIdAndDelete(id).exec();

    if (!deleted) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.status(200).json({ message: "Contact deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting contact" });
  }
};

module.exports = {
    readALLContacts,
    submitMessage,
    deleteContact
};
