const express = require('express');
const router = express.Router();
const controller = require('../controllers/contact');

// GET contact page
router.get('/', controller.contact);

// GET contact success page
router.get('/success', (req, res) => {
  res.render('contact-success', { title: 'Message Sent' });
});

// POST contact form
router.post('/contact', controller.submitMessage);

module.exports = router;
