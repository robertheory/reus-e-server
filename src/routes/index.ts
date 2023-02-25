import { Router } from "express";

import { itemRouter } from "./item.routes";
import { userRouter } from "./user.routes";

const router = Router();

router.use("/user", userRouter);
router.use("/item", itemRouter);

export { router };
