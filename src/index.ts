import { sequelize } from "./helpers/DataBaseConnection";

import express from "express";
import router from "./routes/index.routes";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import swaggerDocs from "./helpers/SwaggerDocs";

dotenv.config();

function main(): void {
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(express.json());
    app.use(bodyParser.json());

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