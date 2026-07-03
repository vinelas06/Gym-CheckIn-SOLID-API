import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in.repository.js";
import { ValidateCheckInUseCase } from "./validate-check-in.js";
import { ResourseNotFoundError } from "./errors/resourse-not-found-error.js";
import { LateCheckInValidationError } from "./errors/late-check-in-validation.js";

let CheckInRepository: InMemoryCheckInRepository;
let sut: ValidateCheckInUseCase;

describe("Validate Check-In Use Case", () => {
  beforeEach(async () => {
    CheckInRepository = new InMemoryCheckInRepository();
    sut = new ValidateCheckInUseCase(CheckInRepository);

    vi.useFakeTimers()
  });

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able to validate check in", async () => {
    const createdCheckIn = await CheckInRepository.create({
        gym_id: 'gym-1',
        user_id: 'user-1'
    })

    await sut.execute({
        checkInId: createdCheckIn.id
    })

    expect(createdCheckIn.validated_at).toEqual(expect.any(Date))
    expect(CheckInRepository.items[0]?.validated_at).toEqual(expect.any(Date))
  }); 

  it("should not be able to validate an inexistent check in", async () => {
    expect(async () => {
    const createdCheckIn = await CheckInRepository.create({
        gym_id: 'gym-1',
        user_id: 'user-1'
    })

    await sut.execute({
        checkInId: 'indexistent check-in id'
    })

    expect(createdCheckIn.validated_at).toEqual(expect.any(Date))
    expect(CheckInRepository.items[0]?.validated_at).toEqual(expect.any(Date))
    }).rejects.toBeInstanceOf(ResourseNotFoundError)
  });

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await CheckInRepository.create({
    gym_id: 'gym-1',
    user_id: 'user-1'
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() => sut.execute({
        checkInId: createdCheckIn.id,
    })).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
});
