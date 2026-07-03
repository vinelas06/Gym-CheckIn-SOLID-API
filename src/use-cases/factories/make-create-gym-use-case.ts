import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym.repository.js";
import { CreateGymUseCase } from "../create-gym.js";

export function makeCreateGymUseCase() {
    const gymRepository = new PrismaGymRepository();
    const useCase = new CreateGymUseCase(gymRepository);

    return useCase
}