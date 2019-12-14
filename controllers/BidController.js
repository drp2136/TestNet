/**
 * 
 * @author Dibyaranjan Pradhan <dibyaranjan.pradhan@mobileprogramming.com>
 * @since 14-Dec-2019
 * @description send the response.
 */

'use strict';
const _ = require('underscore');
const moment = require('moment');
const async = require('async');
const path = require('path');

const BidService = require('../services/bidService');
const UNIVERSAL_FUNCTION = require('../utils/universalFunction.js');


async function getAll(req, res) {
	try {
		//get all BIds
		let allbids = await BidService.getData({});

		let result = { code: 200, message: 'All bids fetch successful.', data: allbids };
		res.send(result);
	} catch (e) {
		return UNIVERSAL_FUNCTION.handleError(e, res);
	}
};

async function create(req, res) {
	try {
		let bid = req.body;
		// create
		let oneBId = await BidService.InsertData(bid);

		let result = { code: 200, message: 'One bid creation successful.', data: oneBId };
		res.send(result);
	} catch (e) {
		return UNIVERSAL_FUNCTION.handleError(e, res);
	}
};

async function update(req, res) {
	try {
		let bidId = req.params._bidId;
		let bidDetails = req.body;

		if (bidDetails.offers) {
			bidDetails['$push'] = { bids: bidDetails.offers };
		}
		if (bidDetails.finalize) {
			bidDetails.finalize = req.body.finalize;
			bidDetails.status = 'F';
		}

		// create
		let updateBid = await BidService.updateData({ _id: bidId }, bidDetails, { lean: true, new: true });

		if (updateBid) {
			let result = { code: 200, message: 'One bid update successful.', data: updateBid };
			res.send(result);
		} else {
			throw { message: 'Some error happened.' }
		}
	} catch (e) {
		return UNIVERSAL_FUNCTION.handleError(e, res);
	}
};

async function finalize(req, res) {
	try {
		let finalizeDetails = req.body;
		let bidId = req.params._bidId;
		let user = req.params._userId;
		let finalize = await BidService.updateData({ _id: bidId }, { finalize: finalizeDetails, status: 'F' }, { lean: true, new: true });

		let result = { code: 200, message: 'One bid is finalized.', data: allbids };
		res.send(result);
	} catch (e) {
		return UNIVERSAL_FUNCTION.handleError(e, res);
	}
}

async function remove(req, res) {
	try {
		let bidId = req.params._bidId;
		let removeBid = await BidService.deleteData({ _id: bidId });

		let result = { code: 200, message: 'One bid delete successful.', data: removeBid };
		res.send(result);
	} catch (e) {
		return UNIVERSAL_FUNCTION.handleError(e, res);
	}
}



module.exports = {
	getAll: getAll,
	create: create,
	update: update,
	finalize: finalize,
	remove: remove
};
