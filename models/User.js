const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  posts: {
    type: Array,
    default: [],
  },
});

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
