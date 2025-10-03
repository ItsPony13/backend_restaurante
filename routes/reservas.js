import express from "express";
import db from "../db.js";

const router = express.Router();

/* ---------------- RESERVAS ---------------- */

// Obtener todas las reservas
router.get("/", (req, res) => {
  db.query("SELECT * FROM reservas", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Crear reserva
router.post("/", (req, res) => {
  const { id_mesa, nombre_cliente, telefono, fecha_reserva, hora_reserva } = req.body;
  db.query(
    "INSERT INTO reservas (id_mesa, nombre_cliente,telefono, fecha_reserva, hora_reserva) VALUES (?, ?, ?, ?, ?)",
    [id_mesa, nombre_cliente, telefono, fecha_reserva, hora_reserva],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id_reserva: result.insertId, id_mesa, nombre_cliente, telefono, fecha_reserva, hora_reserva});
    }
  );
});

// Actualizar reserva
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { id_mesa, nombre_cliente, telefono, fecha_reserva, hora_reserva } = req.body;
  db.query(
    "UPDATE reservas SET id_mesa=?, nombre_cliente=?, telefono=?, fecha_reserva=?, hora_reserva=? WHERE id_reserva=?",
    [id_mesa, nombre_cliente, telefono, fecha_reserva, hora_reserva],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id_reserva: id, id_mesa, nombre_cliente, telefono, fecha_reserva, hora_reserva});
    }
  );
});

// Eliminar reserva
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM reservas WHERE id_reserva=?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Reserva eliminada" });
  });
});

export default router;
