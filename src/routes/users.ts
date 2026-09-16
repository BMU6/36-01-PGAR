import { Router } from 'express'
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from '#controllers'
import { userInputSchema } from '#schemas'
import { validateBody } from '#middleware'

const userRouter = Router()

userRouter.get('/', (getUsers)
userRouter.post('/', validateBody(userInputSchema),createUser)
userRouter.get('/:id', getUserById)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)

export default userRouter
