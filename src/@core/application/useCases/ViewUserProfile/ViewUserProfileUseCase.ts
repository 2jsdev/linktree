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
    const userId = UserId.create(data.userId);

    const user = await this.userRepository.findUserById(userId.getValue());
    if (!user) {
      throw new ValidationError("User not found.");
    }

    return user;
  }
}
