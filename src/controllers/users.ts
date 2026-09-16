import type { RequestHandler } from "express";
import { User } from "#models";
//import type { UserType } from "#types";
import { userInputSchema } from "#schemas";
import { z } from "zod";
import type { Types } from "mongoose";

type UserInputDTO = z.infer<typeof userInputSchema>;
type UserOutputDTO = UserInputDTO & {
  _id: InstanceType<typeof Types.ObjectId>;
  createdAt: Date;
  updatedAt: Date;
};
type IDParams = {
  id: string;
};


export const getUsers: RequestHandler<
  unknown,
  UserOutputDTO[] | { error: string }
> = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users as UserOutputDTO[]);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};


export const createUser: RequestHandler<
  unknown,
  UserOutputDTO | { error: string },
  UserInputDTO
> = async (req, res) => {
  try {
    const newUser = await User.create(req.body satisfies UserInputDTO);
    res.status(201).json(newUser as UserOutputDTO);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};


export const getUserById: RequestHandler<
  IDParams,
  UserOutputDTO | { error: string }
> = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};


export const updateUser: RequestHandler<
  IDParams,
  UserOutputDTO | { error: string },
  UserInputDTO
> = async (req, res) => {
  try {
    const {
      body,
      params: { id },
    } = req;
    const { name, email } = body;
    if (!name || !email)
      return res.status(400).json({ error: "name and email are required" });
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    user.name = name;
    user.email = email;
    await user.save();

    res.json(user as UserOutputDTO);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};


export const deleteUser: RequestHandler<
  IDParams,
  { message: string } | { error: string }
> = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
