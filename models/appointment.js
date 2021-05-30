let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let AppointmentSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Due", "Done", "Cancelled"],
    default: "Due",
  },
  description: { type: String, default: "" },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
