import express from "express";
import cors from "cors";
import { Pool } from "pg";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Use Render environment variables
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
});

// ✅ Test DB connection
pool.connect()
  .then(() => console.log("DB Connected ✅"))
  .catch(err => console.error("DB Connection Error ❌:", err));

// API
app.get("/colleges", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM colleges");
    res.json(result.rows);
  } catch (err: any) {
    console.error("FULL ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ IMPORTANT: use dynamic port for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});