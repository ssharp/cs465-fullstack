const express = require('express');
const router = express.Router();
const ctrlContact = require('../controllers/contacts');

// GET /api/contacts
router.get('/contacts', ctrlContact.readALLContacts);

// POST /api/contact
router.post('/contact', ctrlContact.submitMessage);

// DELETE /api/contact/:id
router.delete('/contact/:id', ctrlContact.deleteContact);

module.exports = router;
