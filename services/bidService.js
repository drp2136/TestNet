/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} outputJson 
 * 
 * @author Dibyaranjan Pradhan <dibyaranjan.pradhan@mobileprogramming.com>
 * @since 14-Dec-2019
 * @description Bids model actions.
 */

const _ = require('underscore');
const BidModel = require('../models/bids');

let getData = (criteria, projection = {}, options = {}) => {
	return new Promise((resolve, reject) => {
		BidModel.find(criteria, projection, options).then(data => {
			return resolve(data);
		}).catch(err => {
			return reject(err);
		});
	});
};

let updateData = (criteria, dataToSet, options) => {
	return new Promise((resolve, reject) => {
		BidModel.findOneAndUpdate(criteria, dataToSet, options).then(data => {
			return resolve(data);
		}).catch(err => {
			return reject(err);
		});
	});
};

let InsertData = (objToSave) => {
	return new Promise((resolve, reject) => {
		new BidModel(objToSave).save().then(data => {
			return resolve(data);
		}).catch(err => {
			return reject(err);
		});
	});
};

// Delete Flight from DB..
let deleteData = (criteria, callback) => {
	// Trip.findOneAndRemove(criteria, callback);
	return new Promise((resolve, reject) => {
		BidModel.findOneAndRemove(criteria).then((data) => {
			return resolve(data);
		}).catch(e => {
			return reject(err);
		});
	});
};


module.exports = {
	getData: getData,
	InsertData: InsertData,
	updateData: updateData,
	deleteData: deleteData,
};