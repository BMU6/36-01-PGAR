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
  UserOutputDTO[] | { message: string }
> = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users as UserOutputDTO[]);
  } catch (error) {
    next(error);
  }
};

export const createUser: RequestHandler<
  unknown,
  UserOutputDTO | { message: string },
  UserInputDTO
> = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body satisfies UserInputDTO);
    res.status(201).json(newUser as UserOutputDTO);
  } catch (error) {
    next(error);
  }
};

export const getUserById: RequestHandler<
  IDParams,
  UserOutputDTO | { message: string }
> = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser: RequestHandler<
  IDParams,
  UserOutputDTO | { message: string },
  UserInputDTO
> = async (req, res, next) => {
  try {
    const {
      body,
      params: { id },
    } = req;
    const { name, email } = body;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.name = name;
    user.email = email;
    await user.save();

    res.json(user as UserOutputDTO);
  } catch (error) {
    next(error);
  }
};

export const deleteUser: RequestHandler<
  IDParams,
  { message: string }
> = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
