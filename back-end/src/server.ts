import app from "./app";
import AppDataSource from "./data-source";
import "dotenv/config";

(async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Iniciou");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });

  app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor executando");
  });
})();
