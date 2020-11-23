/**
 * Clients Model
 * @author <Sajeeb Ahamed> sajeeb07ahamed@gmail.com
 * @copyright MIT
 */

const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'The name is a required field!'],
    trim: true,
    minlength: [5, 'Client name must have 5 characters!'],
  },
  mobile: {
    type: String,
    require: [true, 'The mobile is a required field!'],
    validate: {
      validator: function (value) {
        return /^(\+?88)?01[1-9]\d{8}$/.test(value);
      },
      message: (props) => `${props.value} is not a valid mobile number!`,
    },
    unique: true,
  },
  avatar: {
    type: String,
    default: '/img/avatar.png',
  },
  address: {
    type: String,
    trim: true,
    default: '',
  },
  note: {
    type: String,
    trim: true,
    default: '',
  },
});

const Client = mongoose.model('Client', Schema);

module.exports = Client;
