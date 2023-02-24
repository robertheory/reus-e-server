import { Router } from "express";

import { PrismaClient } from "@prisma/client";

const userRouter = Router();
const prisma = new PrismaClient();

userRouter.get("/list", async (req, res) => {
    const users = await prisma.user.findMany();

    res.json(users);
});

userRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
        where: {
            id: Number(id),
        },
    });

    if (!user) {
        res.status(404).json({ error: "User not found" });
    }

    res.json(user);
});

userRouter.post("/", async (req, res) => {
    const { firstName, lastName, email } = req.body;

    const user = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
        },
    });

    res.json(user);
});

userRouter.put("/:id", (req, res) => {
    const { id } = req.params;
    const data = req.body;

    res.json({ id, data });
});

userRouter.delete("/:id", (req, res) => {
    const { id } = req.params;

    res.json({
        id,
    });
});

export { userRouter };
