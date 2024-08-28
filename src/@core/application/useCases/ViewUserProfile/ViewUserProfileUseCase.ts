import { inject, injectable } from "inversify";
import type { IUserRepository } from "@/@core/domain/repositories/IUserRepository";
import { ValidationError } from "@/@core/domain/errors/ValidationError";
import { User } from "@/@core/domain/entities/User";
import { ViewUserProfileDTO } from "./ViewUserProfileDTO";
import { UserId } from "@/@core/domain/value-objects/UserId";

@injectable()
export class ViewUserProfileUseCase {
  constructor(
    @inject("IUserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(data: ViewUserProfileDTO): Promise<User> {
    try {
      const userId = UserId.create(data.userId);

      const user = await this.userRepository.findUserById(userId.getValue());
      if (!user) {
        throw new ValidationError("User not found.");
      }

      return user;
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new Error(`Validation failed: ${error.message}`);
      }

      throw new Error(
        `Failed to retrieve user profile: ${(error as Error).message}`
      );
    }
  }
}
