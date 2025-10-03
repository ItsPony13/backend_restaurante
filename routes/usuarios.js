import express from "express";
import db from "../db.js";

const router = express.Router();

/* ---------------- USUARIOS ---------------- */

// Obtener todos los usuarios
router.get("/", (req, res) => {
  db.query("SELECT * FROM usuario", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Crear usuario
router.post("/", (req, res) => {
  const { nombre, email, password } = req.body;
  db.query(
    "INSERT INTO usuario (nombre, email, password) VALUES (?, ?, ?)",
    [nombre, email, password],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id_usuario: result.insertId, nombre, email });
    }
  );
});

// Actualizar usuario
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, email, password } = req.body;
  db.query(
    "UPDATE usuario SET nombre=?, email=?, password=? WHERE id_usuario=?",
    [nombre, email, password, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id_usuario: id, nombre, email });
    }
  );
});

// Eliminar usuario
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM usuario WHERE id_usuario=?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Usuario eliminado" });
  });
});

export default router;