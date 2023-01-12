export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  isSeller: boolean;
  cpf: string;
  phone: string;
  birthdate: string;
  description?: string;
  cep: string;
  city: string;
  street: string;
  state: string;
  number: string;
  complement?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserEdit {
  name?: string;
  email?: string;
  password?: string;
  isSeller?: boolean;
  cpf?: string;
  phone?: string;
  birthdate?: string;
  description?: string;
  cep?: string;
  city?: string;
  street?: string;
  state?: string;
  number?: string;
  complement?: string;
}
