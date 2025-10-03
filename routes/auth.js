import express from "express";
import connection from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// 🔑 Ruta de registro de usuarios (opcional, por si quieres crear admin)
router.post("/register", (req, res) => {
  const { nombre, email, password } = req.body;

  // Encriptar la contraseña
  const hashedPassword = bcrypt.hashSync(password, 10);

  connection.query(
    "INSERT INTO usuario (nombre, email, password) VALUES (?, ?, ?)",
    [nombre, email, hashedPassword],
    (err, result) => {
      if (err) {
        console.error("Error al registrar usuario:", err);
        return res.status(500).json({ error: "Error en el servidor" });
      }
      res.json({ message: "Usuario registrado exitosamente" });
    }
  );
});

// 🔑 Ruta de login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  connection.query("SELECT * FROM usuario WHERE email = ?", [email], async (err, results) => {
    if (err) {
      console.error("Error al buscar usuario:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const user = results[0];

    // Comparar contraseña hasheada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Generar token
    const token = jwt.sign({ id: user.id, email: user.email }, "secretKey", {
      expiresIn: "1h",
    });

    res.json({ message: "Login exitoso", token });
  });
});

export default router;
