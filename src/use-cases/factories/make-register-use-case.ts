import { PrismaUserRepository } from "@/repositories/prisma/prisma-user.repository.js";
import { RegisterUseCase } from "../resgister.js";

export function makeRegisterUseCase() {
    const usersRepository = new PrismaUserRepository();
    const resgisterUserCase = new RegisterUseCase(usersRepository);

    return resgisterUserCase
}