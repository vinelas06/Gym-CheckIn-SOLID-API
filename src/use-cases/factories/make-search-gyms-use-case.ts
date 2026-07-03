import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym.repository.js";
import { SearchGymsUseCase } from "../search-gyms.js";

export function makeSearchGymsUseCase() {
    const gymRepository = new PrismaGymRepository();
    const useCase = new SearchGymsUseCase(gymRepository);

    return useCase
}