import Address from "../models/address.model.js";

export const createAddress = async (req, res) => {
  try {
    const newAddress = await Address.create(req.body);
    res.status(201).json(newAddress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const getAddresses = async (req, res) => {
  try {
    const Addresses = await Address.find();
    res.json(Addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getAddress = async (req, res) => {
  try {
    const Address = await Address.findById(req.params.id);
    if (!Address) return res.status(404).json({ message: "Address not found" });
    res.json(Address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateAddress = async (req, res) => {
  try {
    const Address = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(Address);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.json({ message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
