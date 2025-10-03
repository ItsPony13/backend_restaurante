import 'dotenv/config';
import express from "express";
import cors from "cors";
import connection from "./db.js";

// Rutas
import usuariosRoutes from "./routes/usuarios.js";
import mesasRoutes from "./routes/mesas.js";
import reservasRoutes from "./routes/reservas.js";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => res.send("API del restaurante funcionando"));

// Endpoints
app.use("/usuarios", usuariosRoutes);
app.use("/mesas", mesasRoutes);
app.use("/reservas", reservasRoutes);
app.use("/auth", authRoutes);  // 👈 Login y autenticación

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
