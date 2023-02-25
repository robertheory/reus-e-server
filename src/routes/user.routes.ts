import { Router } from "express";

import { PrismaClient } from "@prisma/client";

const userRouter = Router();
const prisma = new PrismaClient();

userRouter.get("/list", async (_, res) => {
    try {
        const users = await prisma.user.findMany();

        res.json(users).status(200);
    } catch (error) {
        res.status(500).send(error);
    }
});

userRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!user) {
            res.status(404).json({ error: "User not found" });
        }

        res.json(user).status(200);
    } catch (error) {
        res.status(500).send(error);
    }
});

userRouter.post("/", async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;

        const emailAlreadyExists = await prisma.user.findFirst({
            where: { email },
        });

        if (emailAlreadyExists) {
            res.status(400).json({ error: "E-mail already registered" });
        }

        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
            },
        });

        res.json(user).status(201);
    } catch (error) {
        res.status(500).send(error);
    }
});

userRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const { firstName, lastName, email } = req.body;

        const emailAlreadyExists = await prisma.user.findFirst({
            where: { email },
        });

        if (emailAlreadyExists) {
            res.status(400).json({ error: "E-mail already registered" });
        }

        const user = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: { firstName, lastName, email },
        });

        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

userRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.user.delete({
            where: {
                id: Number(id),
            },
        });

        res.send().status(200);
    } catch (error) {
        res.status(500).send(error);
    }
});

export { userRouter };
