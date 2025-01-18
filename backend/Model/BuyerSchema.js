const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const addressSchema = new mongoose.Schema({
  houseNo: { type: String, default: '630' },
  street: { type: String, default: 'Ward 19' },
  city: { type: String, default: 'Jhajjar' },
  state: { type: String, default: 'Haryana' },
  pincode: { type: String, default: '124103' },
  isDefault: { type: Boolean, default: false }
});

const buyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  profileImageUrl: { type: String, default: '' },
  addresses: { type: [addressSchema], default: [addressSchema] },
});



buyerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

buyerSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

buyerSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const BuyerModel = mongoose.model('Buyer', buyerSchema);

module.exports = BuyerModel;