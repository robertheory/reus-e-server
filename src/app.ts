// eslint-disable-next-line import/no-extraneous-dependencies
import * as dotenv from "dotenv";
import express from "express";

import { router } from "./routes";

const app = express();

dotenv.config();
app.use(express.json());

app.use(router);

app.get("/", (req, res) => {
    res.send("OK");
});

app.listen(3333, () => console.log("listening on http://localhost:3333"));
