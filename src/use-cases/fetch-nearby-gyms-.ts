import type { GymRepository } from "@/repositories/gym.repository.js";
import type { Gym } from "@prisma/client";

interface FetchNearbyGymsUseCaseRequest {
    userLatitude: number;
    userLongitude: number;
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(
    private gymRepository: GymRepository,
  ) {}

  async execute({
    userLatitude,
    userLongitude
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymRepository.findNearby({
        latitude: userLatitude,
        longitude: userLongitude
    })

    return { gyms }
  }
}
