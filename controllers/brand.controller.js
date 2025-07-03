

import Brand from "../models/brand.model.js";


export const createBrand = async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.status(201).json(newBrand);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const getBrands = async (req, res) => {
  try {
    const Brands = await Brand.find();
    res.json(Brands);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getBrand = async (req, res) => {
  try {
    const Brand = await Brand.findById(req.params.id);
    if (!Brand) return res.status(404).json({ message: "User not found" });
    res.json(Brand);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateBrand = async (req, res) => {
  try {
    const Brand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(Brand);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.json({ message: "Brand deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
