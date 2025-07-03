import Event from "../models/event.model.js";

export const createEvent = async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const getEvents = async (req, res) => {
  try {
    const Events = await Event.find();
    res.json(Events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getEvent = async (req, res) => {
  try {
    const Event = await Event.findById(req.params.id);
    if (!Event) return res.status(404).json({ message: "Event not found" });
    res.json(Event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateEvent = async (req, res) => {
  try {
    const Event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(Event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
