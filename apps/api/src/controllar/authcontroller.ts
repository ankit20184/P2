import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { prisma } from "@repo/db";

import { generateToken } from "../utils/jwt";

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;

  const existing = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existing) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const token = generateToken(user.id);

  res.json({
    user: {
      id: user.id,
      email: user.email,
    },

    token,
  });
}
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  const token = generateToken(user.id);

  res.json({
    token,

    user: {
      id: user.id,
      email: user.email,
    },
  });
}
