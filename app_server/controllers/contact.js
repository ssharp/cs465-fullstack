const ContactMessage = require('../../app_api/models/contact.js');

// Renders the contact page (GET)
module.exports.contact = function(req, res) {
  res.render('contact', { title: 'Contact', currentPage: 'contact' });
};

// Handles form submission (POST)
module.exports.submitMessage = async function(req, res) {
  try {
    const { name, email, tag, message } = req.body;

    const newMessage = new ContactMessage({
      name,
      email,
      tag,
      message
    });

    await newMessage.save();

    res.redirect('/contact/success'); // Redirect to a success page or render a success message
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving message.");
  }
};