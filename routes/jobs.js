const { Router } = require("express");
const pool = require("../config/db");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const jobs = await pool.query("SELECT * FROM job");
    res.status(200).json(jobs.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const newJob = await pool.query(`INSERT INTO job (title) VALUES($1) RETURNING *`, [req.body.title]);
    res.status(201).json(newJob.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
