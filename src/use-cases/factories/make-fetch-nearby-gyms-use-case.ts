import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym.repository.js";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms-.js";

export function makeFetchNearbyGymsUseCase() {
    const gymRepository = new PrismaGymRepository();
    const useCase = new FetchNearbyGymsUseCase(gymRepository);

    return useCase
}