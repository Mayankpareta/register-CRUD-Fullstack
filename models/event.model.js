import mongoose from "mongoose";


const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  date: { type: Date },
  
},{timestamps:true});


EventSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        delete ret.__v;
        delete ret.password;
        return ret;
    }
};


const Event = mongoose.model("Event", EventSchema);
export default Event;
