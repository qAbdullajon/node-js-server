const { Router } = require("express");
const pool = require("../config/db");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const employers = await pool.query("SELECT * FROM employer");
    res.status(200).json(employers.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { name, salary, degree, job_id } = req.body;
    const newEmployer = await pool.query(
      `
      INSERT INTO employer (name, salary, degree, job_id) VALUES ($1, $2, $3, $4) RETURNING *
    `,
      [name, salary, degree, job_id]
    );

    res.status(201).json(newEmployer.rows);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary, degree, job_id } = req.body;
    const oldEmployer = await pool.query(`SELECT * FROM employer WHERE id=$1`, [id]);
    const updateEmployer = await pool.query(`UPDATE employer SET name=$1, salary=$2, degree=$3, job_id=$4 WHERE id=$5 RETURNING *`, [name || oldEmployer.rows[0].name, salary || oldEmployer.rows[0].salary, degree || oldEmployer.rows[0].degree, job_id || oldEmployer.rows[0].job_id, id]);

    res.status(201).json(updateEmployer.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await pool.query(`DELETE FROM employer WHERE id=$1`, [req.params.id]);
    res.status(200).json({ message: "Deleted Employer" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
