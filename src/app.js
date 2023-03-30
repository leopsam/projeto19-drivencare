import express, { json } from "express";
import cors from "cors";
import routes from "./routes/index.js";
import chalk from 'chalk';

const app = express();
app.use(json());
app.use(cors());
app.use(routes);

const port = process.env.PORT;
app.listen(port, () => console.log(chalk.cyan(`Server running in port: ${port}`)));