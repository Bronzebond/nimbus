const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamps: true }
);

questionSchema.plugin(require("./plugins/isDeletedFalse"));

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
