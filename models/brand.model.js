import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
  },
  thumbnails: {
    type: String,
    trim: true,
  },
  logo: {
    type: String,
    trim: true,
  },
}, { timestamps: true });


brandSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        delete ret.__v;
        delete ret.password;
        return ret;
    }
};
const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
