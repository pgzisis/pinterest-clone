const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  twitterId: String,
  token: String,
  name: String,
  photo: String,
  pictures: [{ title: String, url: String }]
});

module.exports = mongoose.model("users", userSchema);
