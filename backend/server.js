require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Validate required environment variables
const requiredEnvVars = ["MONGO_URI"];
const missingVars = requiredEnvVars.filter((v) => !process.env[v]);
if (missingVars.length) {
  console.error(`❌ Missing environment variables: ${missingVars.join(", ")}`);
  process.exit(1);
}

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// ✅ Routes
const reminderRoutes = require("./routes/reminder");
const generalLedgerRoutes = require("./routes/generalLedger");

app.use("/api/reminders", reminderRoutes);
app.use("/api/general-ledger", generalLedgerRoutes);

// ✅ MongoDB Connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ✅ Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
};

app.use(errorHandler);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🌐 Server running at http://localhost:${PORT}`);
});
