import { inject, injectable } from "inversify";
import type { IUserRepository } from "@/@core/domain/repositories/IUserRepository";
import { UpdateUserProfileDTO } from "./UpdateUserProfileDTO";
import { ValidationError } from "@/@core/domain/errors/ValidationError";
import { User } from "@/@core/domain/entities/User";
import { Email } from "@/@core/domain/value-objects/Email";
import { UserId } from "@/@core/domain/value-objects/UserId";

@injectable()
export class UpdateUserProfileUseCase {
  constructor(
    @inject("IUserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(data: UpdateUserProfileDTO): Promise<User> {
    try {
      const userId = UserId.create(data.userId);

      const existingUser = await this.userRepository.findUserById(
        userId.getValue()
      );
      if (!existingUser) {
        throw new ValidationError("User not found.");
      }

      const updatedEmail = data.email
        ? Email.create(data.email)
        : existingUser.props.email;

      if (data.username && data.username.trim() === "") {
        throw new ValidationError("Username cannot be empty.");
      }

      const updatedUser = User.create({
        id: userId,
        name: data.name ?? existingUser.props.name,
        email: updatedEmail,
        username: data.username ?? existingUser.props.username,
        image: data.image ?? existingUser.props.image,
        links: existingUser.props.links,
      });

      const result = await this.userRepository.updateUser(updatedUser);

      return result;
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new Error(`Validation failed: ${error.message}`);
      }

      throw new Error(
        `Failed to update user profile: ${(error as Error).message}`
      );
    }
  }
}
