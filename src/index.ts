import colors from "colors";
import server from "./server"; // Importamos la app ya configurada
import { db } from "./config/db"; // Importamos la instancia de la BBDD

const port = process.env.PORT || 4000;

async function startApp() {
  try {
    // 1. Primero, intentamos conectar y sincronizar la base de datos.
    await db.authenticate();
    await db.sync();
    console.log(
      colors.green.bold("🟢 Conexión y sincronización de BBDD exitosa.")
    );
    // await db.sync({ force: true }); //({ force: true }) si querés reiniciar las tablas

    // 2. Si la conexión es exitosa, iniciamos el servidor.
    server.listen(port, () => {
      console.log(
        colors.cyan.bold(`🚀 REST API funcionando en el puerto ${port}`)
      );
    });
  } catch (error) {
    // 3. Si la conexión falla, mostramos el error y detenemos la aplicación.
    console.error(error);
    console.log(colors.red.bold("❌ Error al conectar a la BBDD"));
    process.exit(1); // Esto es importante para que el proceso no quede colgado.
  }
}

// Llamamos a la función que inicia todo.
startApp();
