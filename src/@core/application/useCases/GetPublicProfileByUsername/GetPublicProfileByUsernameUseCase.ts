import { inject, injectable } from "inversify";
import type { IUserRepository } from "@/@core/domain/repositories/IUserRepository";
import type { ILinkRepository } from "@/@core/domain/repositories/ILinkRepository";
import { ValidationError } from "@/@core/domain/errors/ValidationError";
import {
  GetPublicProfileByUsernameDTO,
  PublicProfileResponseDTO,
} from "./GetPublicProfileByUsernameUseCaseDTO";
import { UserId } from "@/@core/domain/value-objects/UserId";

@injectable()
export class GetPublicProfileByUsernameUseCase {
  constructor(
    @inject("IUserRepository")
    private userRepository: IUserRepository,
    @inject("ILinkRepository")
    private linkRepository: ILinkRepository
  ) {}

  async execute(
    data: GetPublicProfileByUsernameDTO
  ): Promise<PublicProfileResponseDTO> {
    // Search for the user by username
    const user = await this.userRepository.findUserByUsername(data.username);

    if (!user) {
      throw new ValidationError("User not found.");
    }

    const userId = UserId.create(user.id);

    // Get the visible and not archived links of the user
    const links = await this.linkRepository.findLinksByUserId(
      userId.getValue()
    );

    // Filter the links that are not archived and are visible
    const visibleLinks = links.filter((link) => !link.archived && link.visible);

    // Map the links to return only the necessary information
    const linkDTOs = visibleLinks.map((link) => ({
      label: link.label,
      url: link.url,
      visible: link.visible,
      order: link.order,
    }));

    // Create the response with the public user data and the filtered links
    const response: PublicProfileResponseDTO = {
      username: user.username!,
      name: user.name!,
      image: user.image!,
      links: linkDTOs,
    };

    return response;
  }
}
