import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym.repository.js";
import { CreateGymUseCase } from "./create-gym.js";

let GymRepository: InMemoryGymRepository;
let sut: CreateGymUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    GymRepository = new InMemoryGymRepository();
    sut = new CreateGymUseCase(GymRepository);
  });

  it("should be able create user", async () => {
    const { gym } = await sut.execute({
      tittle: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -20.529152,
      longitude: -47.4021888
    });

    expect(gym.id).toEqual(expect.any(String))
  });
});
