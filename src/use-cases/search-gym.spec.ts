import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym.repository.js";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymsUseCase } from "./search-gyms.js";

let gymRepository: InMemoryGymRepository;
let sut: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymRepository();
    sut = new SearchGymsUseCase(gymRepository);
  });


  it("should be able fetch gyms", async () => {
    await gymRepository.create({
    tittle: 'JavaScript Gym',
    description: null,
    phone: null,
    latitude: -20.529152,
    longitude: -47.4021888
    })

    await gymRepository.create({
    tittle: 'TypeScript Gym',
    description: null,
    phone: null,
    latitude: -20.529152,
    longitude: -47.4021888
    })

    const { gyms } = await sut.execute({
        query: 'JavaScript',
        page: 1
    });

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
    expect.objectContaining({ tittle: 'JavaScript Gym' }),
])
  });

  it("should be able to fetch check in history", async () => {

    for (let i = 1; i <= 22; i++) {
        await gymRepository.create({
            description: null,
            phone: null,
            latitude: -20.529152,
            longitude: -47.4021888,
            tittle: `JavaScript Gym ${i}`
    })
    }

    const { gyms } = await sut.execute({
        query: 'JavaScript',
        page: 2
    });

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
    expect.objectContaining({ tittle: 'JavaScript Gym 21' }),
    expect.objectContaining({ tittle: 'JavaScript Gym 22' })
    ])
  });
});
