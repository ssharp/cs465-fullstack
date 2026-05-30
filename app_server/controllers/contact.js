/* GET contact view */
const contact = (req, res) => {
    res.render('contact', { title: 'Travlr Getaways', currentPage: 'contact'});
};

module.exports = {
    contact
};