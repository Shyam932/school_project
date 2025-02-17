const express = require("express");
const classRoutes = require("./routes/classRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const cors = require("cors");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// mongodb connection
connectDB();

// Routes
app.use("/api/classes", classRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/analytics", analyticsRoutes);



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(
    `Backend server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
