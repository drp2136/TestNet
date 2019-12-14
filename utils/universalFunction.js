'use strict';
const CryptoJS = require("crypto-js");
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = 'sUPerSeCuREKeY&^$^&$^%$^%7782348723t4872t34Ends';


let encryptPlainText = plainText => {
	let encryptedWord = CryptoJS.enc.Utf8.parse(plainText);
	//return CryptoJS.enc.Base64.stringify(encryptedWord);
	return md5(encryptedWord);
};

let generateWebToken = userData => {
	let tokenExp = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 8);
	let token = jwt.sign({ id: userData._id, email: userData.email, exp: tokenExp }, JWT_SECRET_KEY);
	return token;
};

let handleError = (e, res) => {
	let result = { code: 404, message: 'No data found', data: null };
	if (e.message) result.message = e.message;
	if (e.response_code && e.message && e.type) result = e;
	res.send(result);
};

let decodWebToken = token => {
	try {
		let decoded = jwt.verify(token, JWT_SECRET_KEY);
		return decoded;
	} catch (error) {
		throw { code: 401, message: 'Invalid user token', data: null };
	}
};



module.exports = {
	encryptPlainText: encryptPlainText,
	generateWebToken: generateWebToken,
	handleError: handleError,
	decodWebToken: decodWebToken,
};
