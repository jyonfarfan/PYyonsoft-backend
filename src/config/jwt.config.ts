import dotenv from "dotenv";
dotenv.config();

// Verificar que existe la variable de entorno
if (!process.env.JWT_SECRET) {
  console.error(
    "ERROR: JWT_SECRET no está definida en las variables de entorno"
  );
  process.exit(1);
}

export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
  // Configuraciones adicionales de seguridad
  algorithm: process.env.JWT_ALGORITHM,
  // Puedes agregar más opciones según necesites
};
