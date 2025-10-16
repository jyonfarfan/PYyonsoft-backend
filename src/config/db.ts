import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

// Determina la extensión de los archivos a buscar (.ts para desarrollo, .js para producción)
const fileExtension = process.env.NODE_ENV === "production" ? ".js" : ".ts";

const { DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

export const db = new Sequelize({
  dialect: "postgres",
  host: "127.0.0.1",
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  // models: [__dirname + "/../models"], // importa todos los modelos automáticamente
  models: [__dirname + `/../modules/**/*.model${fileExtension}`], //activar cuando reorganice el proyecto.
  define: { timestamps: true },
  logging: false, // podés cambiar a true si querés ver las queries en la consola
});
