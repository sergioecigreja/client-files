let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ClientSchema = new Schema({
  name: { type: String, required: true, maxLength: 150 },
  birthdate: { type: Date },
  phone_number: { type: String },
  nif: { type: String },
  address: { type: String },
});

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

ClientSchema.virtual("age").get(function () {
  return getAge(this.birthdate).toString();
});

module.exports = mongoose.model("Client", ClientSchema);
