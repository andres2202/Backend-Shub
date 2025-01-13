import { sequelize } from "./helpers/DataBaseConnection";

import express from "express";
import router from "./routes/index.routes";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import swaggerDocs from "./helpers/SwaggerDocs";
import cors from "cors";

dotenv.config();

function main(): void {
    const app = express();
    const port = process.env.PORT || 3000;
    const allowedOrigins = [process.env.FRONTEND_URL as string, process.env.FRONTEND_URL_LOCAL as string];
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(cors({
        origin: allowedOrigins,
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['Authorization'],
      })
    );

    sequelize.sync().then(() => {
        console.log('Database connected');
    })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            router(app);
            swaggerDocs(app, port as number);
        });
    })
    .catch((error) => {
        console.log(error);
    });
}

main();