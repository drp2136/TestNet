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

const UserService = require('./../services/userService');
const UNIVERSAL_FUNCTION = require('../utils/universalFunction.js');


async function LoginUser(req, res) {
	let userData = req.body;
	let LoginUserInit = async () => {
		try {
			let password = userData.password.trim();
			let criteria = { "user_pass": password, type: userData.type }, projection = {}, options = { lean: true };
			if (userData.usercred.indexOf('@') == -1) criteria.user_name = new RegExp('^' + userData.usercred + '$', 'i');
			else criteria.user_email = userData.usercred;
			let authenticateUser = await UserService.getData(criteria, projection, options);
			if (authenticateUser.length == 0) throw { code: 400, message: 'Invalid user credentials', data: null };
			else if (authenticateUser[0].user_status === "P") throw { code: 400, message: 'Your account is not yet verified.', data: null };
			return authenticateUser[0];
		} catch (e) {
			throw e;
		}
	};

	try {
		let LoginUser = await LoginUserInit();
		if (LoginUser) {
			let userDetails = {
				fullName: LoginUser.fullName,
				user_name: LoginUser.user_name,
				user_email: LoginUser.user_email,
				authToken: LoginUser.authToken,
				created_date: LoginUser.created_date,
				updated_date: LoginUser.updated_date,
			};

			let result = { code: 200, message: 'Login successful.', data: userDetails };
			res.send(result);
		}
	} catch (e) {
		return UNIVERSAL_FUNCTION.handleError(e, res);
	}
};

module.exports = {
	LoginUser: LoginUser,
};
