import express from "express";
import cors from "cors";
import { Pool } from "pg";

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  password: "1234",
  host: "localhost",
  port: 5432,
  database: "college_db",
});
pool.connect()
  .then(() => console.log("DB Connected ✅"))
  .catch(err => console.error("DB Connection Error ❌:", err));

app.get("/colleges", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM colleges");
    res.json(result.rows);
  } catch (err: any) {
    console.error("FULL ERROR:", err);  // 👈 terminal
    res.status(500).json({ error: err.message }); // 👈 show real error in browser
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});