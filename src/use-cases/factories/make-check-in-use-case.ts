import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in.repository.js";
import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym.repository.js";
import { CheckInUseCase } from "../check-in.js";

export function makeCheckInUseCase() {
    const checkInRepository = new PrismaCheckInRepository();
    const gymRepository = new PrismaGymRepository()
    const useCase = new CheckInUseCase(checkInRepository, gymRepository);

    return useCase
}