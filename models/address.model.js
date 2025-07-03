import mongoose from "mongoose";


const addressSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
},
  label: {
    type:[String],
    enum:["work","home","other"],
    default: "work"
  },
  street: {
    type:String,
},
  city: {
    type:String,
},
  state: {
    type:String,
},
  postalCode: {
    type:String,
},
  country: {
    type:String,
},
}, { timestamps: true });

addressSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        delete ret.__v;
        delete ret.password;
        return ret;
    }
};
const Address = mongoose.model("Address", addressSchema);
export default Address;
