import type { RequestHandler } from "express";
import { User } from "#models";


// FR015 	
// Response 	Exclude sensitive fields (e.g., password) from all API
// Shaping  responses; normalize _id to id where returned.


export const getUsers: RequestHandler = async (req, res) => {
  // const { email, password } = req.body;

  // if (!email || !password)
  //   return res.status(400).send("Email and password are required!");

  const users = await User.find();

  res.status(200).json(users);
};


export const createUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new Error("Email and password are required!",{cause:{status:400}});

  const user = await User.create({ email, password });

  res.status(201).json(user);
};


export const getUserById: RequestHandler = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    throw  new Error("Something went wrong", {cause:{status:500}});
  }

  const users = await User.find();

  res.status(200).json(users);
};


export const updateUser: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const { name, email} = req.body;

  if (!email) {
    throw  new Error("Something went wrong", {cause:{status:400}});
  }
  const user = await User.findByIdAndUpdate({ _id:id }, {name, email });

  res.status(201).json(user);
};

export const deleteUser: RequestHandler = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    throw  new Error("Something went wrong", {cause:{status:500}});
  }

  const user = await User.findByIdAndDelete({ _id:id });

  res.status(200).json(user);
};