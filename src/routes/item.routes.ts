import { Router } from "express";

import { PrismaClient } from "@prisma/client";

const itemRouter = Router();
const prisma = new PrismaClient();

itemRouter.get("/list", async (req, res) => {
    try {
        const items = await prisma.item.findMany();
        res.json(items);
    } catch (error) {
        res.status(500).send(error);
    }
});

itemRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const item = await prisma.item.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!item) {
            res.status(404).json({ error: "Item not found" });
        }

        res.json(item);
    } catch (error) {
        res.status(500).send(error);
    }
});

itemRouter.post("/", async (req, res) => {
    try {
        const { name, price, ownerId, condition } = req.body;
        const item = await prisma.item.create({
            data: {
                name,
                price: Number(price).toFixed(2),
                ownerId: Number(ownerId),
                condition,
            },
        });
        res.status(201).json(item);
    } catch (error) {
        console.log("error", error);
        res.status(500).send(error);
    }
});

itemRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const { name, price, condition } = req.body;

        const item = await prisma.item.update({
            where: {
                id: Number(id),
            },
            data: { name, price: Number(price).toFixed(2), condition },
        });

        res.json(item);
    } catch (error) {
        res.status(500).send(error);
    }
});

itemRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.item.delete({
            where: {
                id: Number(id),
            },
        });

        res.send().status(200);
    } catch (error) {
        res.status(500).send(error);
    }
});

export { itemRouter };
