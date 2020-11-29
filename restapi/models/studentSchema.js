const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email already present"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String,
  },
  phone: {
    type: Number,
    min: 10,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
});

studentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log(`original password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`Hashed password is ${this.password}`);
  }
  next();
});

const Student = new mongoose.model("User", studentSchema);

module.exports = Student;
