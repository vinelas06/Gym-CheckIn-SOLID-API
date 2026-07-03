import type { CheckInRepository } from "@/repositories/check-in.repository.js";
import type { CheckIn } from "@prisma/client";
import { ResourseNotFoundError } from "./errors/resourse-not-found-error.js";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./errors/late-check-in-validation.js";

interface ValidateCheckInUseCaseRequest {
    checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(
    private checkInRepository: CheckInRepository,
  ) {}

  async execute({
    checkInId
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
        throw new ResourseNotFoundError()
    }

    const distanceInMinutosFromCheckInCreation = dayjs(new Date()).diff(
        checkIn.created_at,
        "minutes"
    )

    if (distanceInMinutosFromCheckInCreation > 20) {
        throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return { checkIn }
  }
}
