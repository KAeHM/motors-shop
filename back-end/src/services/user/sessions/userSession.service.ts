import jwt from 'jsonwebtoken'
import AppDataSource from '../../../data-source'
import { AppError } from '../../../errors/AppError'
import { IUserLogin } from '../../../interfaces/users'
import bcrypt from 'bcrypt'
import { User } from '../../../entities/user.entity'


const userSessionService = async ({email,password}: IUserLogin ) => {

    const userRepository = AppDataSource.getRepository(User)
    
    const userRegistered = await userRepository.findOne({where: {email}})

    if(!userRegistered){
        throw new AppError("Invalid email/password", 404)
    }

    const acceptPassword = bcrypt.compareSync(password, userRegistered!.password)

    if(!acceptPassword){
        throw new AppError("Invalid email/password", 404)
    }

    const token = jwt.sign({email}, String(process.env.JWT_SECRET), {expiresIn: '24h'})

    return token

}

export default userSessionService