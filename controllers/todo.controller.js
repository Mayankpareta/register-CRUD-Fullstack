import Todo from "../models/todo.model.js";
import Joi from "joi";


const todoSchema = Joi.object({
  title: Joi.string().min(1).required(),
  completed: Joi.boolean().optional()
});


export const createTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;

    const { error } = todoSchema.validate({ title, completed });
    if (error) return res.status(400).json({ error: error.details[0].message });

    let newTodo = await Todo.create({
      title,
      completed,
      user: req.user._id
    });

   
    newTodo = await newTodo.populate("user", "userName email");

    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id })
      .populate("user", "userName email");
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate("user", "userName email"); 
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    let todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    ).populate("user", "userName email"); 

    if (!todo) return res.status(404).json({ message: "Todo not found" });

    res.status(200).json({ message: "Todo updated", todo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    }).populate("user", "userName email");
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    res.status(200).json({ message: "Todo deleted", todo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

