import type { GymRepository } from "@/repositories/gym.repository.js";
import type { Gym } from "@prisma/client";
import { randomUUID } from "crypto";

interface CreateGymUseCaseRequest {
    tittle: string;
    description: string | null;
    phone: string | null;
    latitude: number;
    longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    tittle,
    description,
    phone,
    latitude,
    longitude
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymRepository.create({
    id: randomUUID(),
    tittle,
    description,
    phone,
    latitude,
    longitude
    });

    return { gym } 
  }
}
