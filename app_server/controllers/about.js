/* GET about view */
const about = (req, res) => {
    res.render('about', { title: 'Travlr Getaways', currentPage: 'about'});
};

module.exports = {
    about
};