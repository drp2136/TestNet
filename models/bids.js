const Mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(Mongoose);
const Schema = Mongoose.Schema;

let bidSchema = new Schema({
    productName     : String,
    price           : Number,
    bids            : [{ 
        user: { type: Mongoose.Types.ObjectId, ref: 'users' },
        amount: Number
    }],
    finalize: { 
        user: { type: Mongoose.Types.ObjectId, ref: 'users' },
        amount: Number
    },
    status          : { type: String, default: 'O'}, // O:open, B: bidded, F:finalized
    // created_by      : { type: Mongoose.Types.ObjectId, ref: 'users' },
    created_date    : Date,
    updated_date    : Date,
});

bidSchema.plugin(AutoIncrement, { inc_field: 'bidId' });
module.exports = Mongoose.model('bids', bidSchema);

