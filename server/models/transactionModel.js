/**
 * Transaction Model
 * @author <Sajeeb Ahamed> sajeeb07ahamed@gmail.com
 * @copyright MIT
 */

const mongoose = require('mongoose');

const { Schema } = mongoose;

const TransactionSchema = Schema({
  amount: {
    type: Number,
    require: [true, 'The amount is a required field!'],
    min: [1, 'The amount must be a positive value.'],
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    require: [true, 'Every transaction must have a client ID'],
  },
  type: {
    type: String,
    required: [true, 'Transaction must have a type'],
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
