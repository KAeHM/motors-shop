import AppDataSource from "../../data-source";
import { Listing } from "../../entities/listing.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IListRegister } from "../../interfaces/listings";



const registerListingService = async (userEmail: string, data : IListRegister)  => {

    const listingRepository = AppDataSource.getRepository(Listing)
    const userRepository = AppDataSource.getRepository(User)

    const userOwnerList = await userRepository.findOne({where: {email: userEmail}, select: {id: true, name: true, phone: true, isSeller: true}})
    if(!userOwnerList){
        throw new AppError("User not found", 404)
    }

    if(!userOwnerList.isSeller){
        throw new AppError("User is not a seller",401)
    }
    
    const newList = new Listing()
    newList.listingType = data.listingType
    newList.name = data.name
    newList.year = data.year
    newList.km = data.km
    newList.price = data.price
    newList.description = data.description
    newList.typeVehicle = data.typeVehicle
    newList.coverImage = data.coverImage
    newList.user = userOwnerList


    await listingRepository.save(newList)

    
    return newList

}


export default registerListingService