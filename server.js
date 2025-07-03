import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import userRoutes from "./routes/user.routes.js";
import brandRoutes from "./routes/brand.routes.js";
import qtyheadRoutes from "./routes/qtyhead.routes.js";
import addressRoutes from "./routes/address.routes.js";
import eventRoutes from "./routes/event.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import forgetPasswordRoutes from "./routes/forgetpassword.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/qtyheads", qtyheadRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/todo", todoRoutes);
app.use("/api/forgetpassword", forgetPasswordRoutes);


app.get("/", (req, res) => {
  res.send("API is working fine!");
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("DB connection error:", err.message));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
