const express = require('express');
let router = express.Router();

const UserController = require('../controllers/UserController');
const BidController = require('../controllers/BidController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/login');
  // res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/login', UserController.LoginUser); // Admin Login
router.get('/bids', BidController.getAll); // display all bids
router.post('/bid', BidController.create); // create bid
router.put('/bid/:_bidId', BidController.update); // update bids
router.delete('/bid/:_bidId', BidController.remove); // delete a bid by Id


module.exports = router;
