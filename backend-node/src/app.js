import express from "express";
import cors from "cors";
import formRoutes from "./routes/form.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/forms", formRoutes);

app.get("/", (req, res) => res.json({ message: "API formulario OK" }));

export default app;
