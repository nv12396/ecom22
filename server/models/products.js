const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const productsSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 160,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      require: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      require: true,
      trim: true,
    },
    category: {
      // we set ObjectId so we can also use "populate" in our queries later on
      type: ObjectId,
      // also important so we can use populate
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      required: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productsSchema);
