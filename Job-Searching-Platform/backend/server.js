import app from "./app.js";
import cloudinary from "cloudinary";
import { dbConnection } from "./database/dbConnection.js";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

const startServer = async () => {
  try {
    await dbConnection();

    const port = process.env.PORT || 4004;
    const server = app.listen(port, () => {
      console.log(`Server running at port ${port}`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`Port ${port} is already in use. Stop the existing process or change PORT in config.env.`);
        process.exit(1);
      }

      console.error("Server failed to start:", err);
      process.exit(1);
    });
  } catch (err) {
    console.error("Startup failed:", err.message || err);
    process.exit(1);
  }
};

startServer();
