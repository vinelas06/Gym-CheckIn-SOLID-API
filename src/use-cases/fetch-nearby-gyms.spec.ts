import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym.repository.js";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms-.js";

let gymRepository: InMemoryGymRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymRepository();
    sut = new FetchNearbyGymsUseCase(gymRepository);
  });


  it("should be able to fetch nearby gyms", async () => {
    await gymRepository.create({
    tittle: 'Near Gym',
    description: null,
    phone: null,
    latitude: -20.529152,
    longitude: -47.4021888
    })

    await gymRepository.create({
    tittle: 'Far Gym',
    description: null,
    phone: null,
    latitude: -21.1957687,
    longitude: -47.8047271
    })

    const { gyms } = await sut.execute({
      userLatitude: -20.529152,
      userLongitude: -47.4021888
    });

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
    expect.objectContaining({ tittle: 'Near Gym' }),
])
  });
});
