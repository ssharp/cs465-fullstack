const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
const tripList = async (req, res) => {
  try {
    const q = await Model.find({}).exec();

    if (!q || q.length === 0) {
      return res.status(404).json({ message: "No trips found" });
    }

    return res.status(200).json(q);

  } catch (err) {
    console.error("tripList ERROR:", err);
    return res.status(500).json(err);
  }
};

// GET: /trips/:tripCode
const tripsFindByCode = async (req, res) => {
  try {
    const q = await Model.findOne({ code: req.params.tripCode }).exec();

    if (!q) {
      return res.status(404).json({ message: "Trip not found" });
    }

    return res.status(200).json(q);

  } catch (err) {
    console.error("tripsFindByCode ERROR:", err);
    return res.status(500).json(err);
  }
};

// POST: /trips - add a new trip
const tripAddTrip = async (req, res) => {
  try {

    const newTrip = new Trip({
      code: req.body.code,
      name: req.body.name,
      length: Number(req.body.length),
      start: req.body.start,
      resort: req.body.resort,
      perPerson: Number(req.body.perPerson),
      image: req.body.image,
      description: req.body.description
    });

    const q = await newTrip.save();
    return res.status(201).json(q);

  } catch (err) {
    console.error("tripAddTrip ERROR:", err);
    return res.status(500).json(err);
  }
};

// PUT: /trips/:tripCode - Adds a new trip
// Regardless of outcome, responsemust include HTML status code
// and JSON message to the requesting client
const tripUpdateTrip = async (req, res) => {
    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);

    const q = await Model
        .findOneAndUpdate(
            { 
                code: req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: Number(req.body.length),
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
        .exec();

    if (!q)
    { // Database returned no data
        return res
            .status(400)
            .json(err);
        } else { // Return resulting updated trip
            return res
                .status(201)
                .json(q);
        }

        // Uncomment the following to show results of operation
        // on the console
        //console.log(q);
};

module.exports = {
  tripList,
  tripsFindByCode,
  tripAddTrip,
  tripUpdateTrip
};