const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const routes = require("./routes/index");

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use("/", routes);

const port = process.env.PORT || 5000;

app.listen(8000, () => {
  console.log(`Server is running on port ${port}`);
});
