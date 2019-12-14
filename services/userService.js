/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} outputJson 
 * 
 * @author Dibyaranjan Pradhan <dibyaranjan.pradhan@mobileprogramming.com>
 * @since 14-Dec-2019
 * @description User model actions.
 */

const _ = require('underscore');
const UserModel = require('../models/users');

let getData = (criteria, projection = {}, options = {}) => {
	return new Promise((resolve, reject) => {
		UserModel.find(criteria, projection, options).then(data => {
			return resolve(data);
		}).catch(err => {
			return reject(err);
		});
	});
};

let updateData = (criteria, dataToSet, options) => {
	return new Promise((resolve, reject) => {
		UserModel.findOneAndUpdate(criteria, dataToSet, options).then(data => {
			return resolve(data);
		}).catch(err => {
			if (err.code == 11000 || 11001 === err.code) {
				if (err.errmsg.indexOf('user_name_1') > -1) return reject({message:'Username already exists', code:400, data: null});
				if (err.errmsg.indexOf('user_email_1') > -1) return reject({message:'Email already exists', code:400, data: null});
				return reject(err);
			} else {
				return reject(err);
			}
		});
	});
};

let InsertData = (objToSave) => {
	return new Promise((resolve, reject) => {
		new UserModel(objToSave).save().then(data => {
			return resolve(data);
		}).catch(err => {
			if (err.code == 11000 || 11001 === err.code) {
				if (err.errmsg.indexOf('user_name_1') > -1) return reject({message:'Username already exists', code:400, data: null});
				if (err.errmsg.indexOf('user_email_1') > -1) return reject({message:'Email already exists', code:400, data: null});
				return reject(err);
			} else {
				return reject(err);
			}
		});
	});
};

//Delete User in DB
let deleteData = (criteria, callback) => {
	UserModel.findOneAndRemove(criteria, callback);
};


module.exports = {
	getData: getData,
	InsertData: InsertData,
	updateData: updateData,
	deleteData: deleteData,
};