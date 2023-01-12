import {Response, Request, NextFunction} from 'express'
import { User } from '../entities/user.entity'
import { AppError } from '../errors/AppError'
import AppDataSource from '../data-source'


export const isThisEmailAlreadyBeingUsedMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const { email } = req.body
    console.log(email)

    const userRepository = AppDataSource.getRepository(User)

    const emailAlreadyBeingUsed = await userRepository.findOne({where: {email}})
    
    if(emailAlreadyBeingUsed){
        throw new AppError("This email is already being used", 403)
    }


    next()
}