import { PrismaUserRepository } from "@/repositories/prisma/prisma-user.repository.js";
import { GetUserProfileUseCase } from "../get-user.js";

export function makeGetUserProfileUseCase() {
    const userRepository = new PrismaUserRepository();
    const useCase = new GetUserProfileUseCase(userRepository);

    return useCase
}