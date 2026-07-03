import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in.repository.js";
import { GetUserMetricsUseCase } from "../get-user-metrics.js";

export function makeGetUserMetricsUseCase() {
    const checkInRepository = new PrismaCheckInRepository();
    const useCase = new GetUserMetricsUseCase(checkInRepository);

    return useCase
}