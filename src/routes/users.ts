import { Router } from 'express'
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from '#controllers'

const userRouter = Router()

userRouter.get('/', getUsers)
userRouter.post('/', createUser)
userRouter.get('/:id', getUserById)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)

export default userRouter
