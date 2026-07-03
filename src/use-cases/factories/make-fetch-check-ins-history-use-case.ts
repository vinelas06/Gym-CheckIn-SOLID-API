import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in.repository.js";
import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history.js";

export function makeFetchUserCheckInsHistoryUseCase() {
    const checkInRepository = new PrismaCheckInRepository();
    const useCase = new FetchUserCheckInsHistoryUseCase(checkInRepository);

    return useCase
}