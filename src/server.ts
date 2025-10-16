import express from "express";
import morgan from "morgan";
import cors from "cors";
import roleRouter from "./modules/role/role.router";
import companyRouter from "./modules/company/company.router";
import userRouter from "./modules/users/user.router";
import authRouter from "./modules/auth/auth.router";

// 1. Creamos la instancia de la aplicación
const app = express();

// 2. Aplicamos todo el middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// 3. Definimos las rutas de la API
app.use("/api1/role", roleRouter);
app.use("/api1/company", companyRouter);
app.use("/api1/users", userRouter);
app.use("/api1/login", authRouter);

// 4. Exportamos la aplicación ya configurada
export default app;
