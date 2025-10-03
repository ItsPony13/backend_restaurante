import express from "express";
import db from "../db.js";

const router = express.Router();

/* ---------------- MESAS ---------------- */

// Obtener todas las mesas
router.get("/", (req, res) => {
  db.query("SELECT * FROM mesas", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Crear mesa
router.post("/", (req, res) => {
  const { numero_mesa, capacidad, estado } = req.body;
  db.query(
    "INSERT INTO mesas (numero_mesa, capacidad, estado) VALUES (?, ?, ?)",
    [numero_mesa, capacidad, estado],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id_mesa: result.insertId, numero_mesa, capacidad, estado });
    }
  );
});

// Actualizar mesa
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { numero_mesa, capacidad, estado } = req.body;
  db.query(
    "UPDATE mesas SET numero_mesa=?, capacidad=?, estado=? WHERE id_mesa=?",
    [numero_mesa, capacidad, estado, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id_mesa: id, numero_mesa, capacidad, estado });
    }
  );
});

// Eliminar mesa
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM mesas WHERE id_mesa=?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Mesa eliminada" });
  });
});

export default router;