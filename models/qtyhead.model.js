import mongoose from "mongoose";
const qtyHeadSchema = new mongoose.Schema({
 name: {
        type: String,
        trim: true,
        lowercase: true
    },
    value: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    example: {
        type: String,
        trim: true
    },


},{timestamps:true})


qtyHeadSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        delete ret.__v;
        delete ret.password;
        return ret;
    }
};

const QtyHead = mongoose.model("QtyHead", qtyHeadSchema);
export default QtyHead;