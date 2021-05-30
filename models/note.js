let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let NoteSchema = new Schema({
  clientfile: {
    type: Schema.Types.ObjectId,
    ref: "ClientFile",
    required: true,
  },
  content: { type: String, default: "" },
  image: { type: String, default: "" },
});

module.exports = mongoose.model("Note", NoteSchema);
