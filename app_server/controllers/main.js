/* GET Homepage */
const index = (req, res) => {
  res.render('index', {title: 'Travlr Getaways', currentPage: 'home'});
};

module.exports = {
    index
}