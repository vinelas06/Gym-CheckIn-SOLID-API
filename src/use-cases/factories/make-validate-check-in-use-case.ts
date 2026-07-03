import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in.repository.js";
import { ValidateCheckInUseCase } from "../validate-check-in.js";

export function makeValidateCheckInUseCase() {
    const checkInRepository = new PrismaCheckInRepository();
    const useCase = new ValidateCheckInUseCase(checkInRepository);

    return useCase
}