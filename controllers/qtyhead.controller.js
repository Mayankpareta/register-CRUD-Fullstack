import QtyHead from "../models/qtyhead.model.js";

export const createQtyHead = async (req, res) => {
  try {
    const newQtyHead = await QtyHead.create(req.body);
    res.status(201).json(newQtyHead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const getQtyHeads = async (req, res) => {
  try {
    const QtyHeads = await QtyHead.find();
    res.json(QtyHeads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getQtyHead = async (req, res) => {
  try {
    const QtyHead = await QtyHead.findById(req.params.id);
    if (!QtyHead) return res.status(404).json({ message: "QtyHead not found" });
    res.json(QtyHead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateQtyHead = async (req, res) => {
  try {
    const QtyHead = await QtyHead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(QtyHead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteQtyHead = async (req, res) => {
  try {
    await QtyHead.findByIdAndDelete(req.params.id);
    res.json({ message: "QtyHead deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
