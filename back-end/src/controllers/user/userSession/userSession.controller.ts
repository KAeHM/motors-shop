import { Response, Request } from "express";
import { AppError, handleError } from "../../../errors/AppError";
import userSessionService from "../../../services/user/sessions/userSession.service";


const userSessionController = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body
        const token = await userSessionService({email, password})
        return res.status(200).json({token})
    } catch (error) {
        if(error instanceof AppError){
            handleError(error, res)
        }
    }
}

export default userSessionController