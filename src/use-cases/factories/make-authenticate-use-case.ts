import { PrismaUserRepository } from "@/repositories/prisma/prisma-user.repository.js";
import { AuthenticateUseCase } from "../authenticate.js";

export function makeAuthenticateUseCase() {
    const authenticateRepository = new PrismaUserRepository();
    const authenticateUseCase = new AuthenticateUseCase(authenticateRepository);

    return authenticateUseCase
}