import { User } from "../../entities/user.entity";

export interface IListRegister {
  listingType: string;
  name: string;
  year: number;
  km: number;
  price: number;
  description: string;
  typeVehicle: string;
  coverImage: string;
  // user: User
}

export interface IListingEdit {
  listingType?: string;
  name?: string;
  year?: number;
  km?: number;
  price?: number;
  description?: string;
  typeVehicle?: string;
  coverImage?: string;
}
