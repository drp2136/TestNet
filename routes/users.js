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

router.post('/login', UserController.LoginUser); // User login

router.get('/bids', BidController.getAll); // display all bids
router.put('/bid/:_bidId', BidController.update); // place bids
// router.post('/bid', Controller.create); // create bid
// router.delete('/bid/:_bidId', Controller.delete); // delete a bid by Id
// router.post('/bid/:_bidId', Controller.finalize); // delete a bid by Id


module.exports = router;
