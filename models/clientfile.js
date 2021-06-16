let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ClientFileSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
    unique: true,
  },
  kids: { type: Number, default: 0 },
  married: { type: Boolean, default: false },
  profession: { type: String, default: "" },
  hobbies: { type: String, default: "" },
  avaliation_of_posture: { type: String, default: "" },
  tumble_history: [{ date: Date, description: String }],
  dental_history: [{ description: String }],
  pregnancy_history: [{ date: Date, description: String }],
  cirurgical_history: [{ date: Date, description: String }],
  nutrition: { type: String, default: "" },
  created_at: { type: Date, default: Date.now },
  treatments_made: [{ issue: String, treatment: String }],
});

module.exports = mongoose.model("ClientFile", ClientFileSchema);
