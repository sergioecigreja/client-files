let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ClientFileSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
    unique: true,
  },
  created_at: { type: Date, default: Date.now },
  description: { type: String, default: "" },
});

module.exports = mongoose.model("ClientFile", ClientFileSchema);
