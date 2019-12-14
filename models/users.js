const Mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(Mongoose);
const Schema = Mongoose.Schema;

let userSchema = new Schema({
    fullName          : { type: String },
    user_name         : { type: String, required: true, unique: true },
    user_email        : { type: String, required: true, unique: true },
    user_pass         : { type: String, required: true },
    authToken         : { type: String },
    type              : { type: String, default: 'U' }, // U:user, A:admin
    created_date      : { type: Date },
    updated_date      : { type: Date },
});
userSchema.plugin(AutoIncrement, { inc_field: 'userId' });
module.exports = Mongoose.model('users', userSchema);

