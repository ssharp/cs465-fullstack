var fs = require('fs');
var mealsData = JSON.parse(fs.readFileSync('./data/meals.json', 'utf8'));

/* GET meals view */
const meals = (req, res) => {
    res.render('meals', { title: 'Travlr Getaways', currentPage: 'meals', meals: mealsData});
};

module.exports = {
    meals
};