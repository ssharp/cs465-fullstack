/* GET news view */
const news = (req, res) => {
    res.render('news', { title: 'Travlr Getaways', currentPage: 'news'});
};

module.exports = {
    news
};