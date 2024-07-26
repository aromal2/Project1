const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
});

const studentSchema = new Schema({
  student: {
    type: String,
    default: "",
  },
  subject: {
    type: String,
    default: "",
  },
  mark: {
    type: String,
    default: "",
  },
});

const Userprofile = mongoose.model("Userprofile", userSchema);
const Student = mongoose.model("Student", studentSchema);

module.exports = {
  Userprofile,
  Student,
};
