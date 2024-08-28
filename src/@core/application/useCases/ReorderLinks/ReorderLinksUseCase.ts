import { inject, injectable } from "inversify";
import type { ILinkRepository } from "@/@core/domain/repositories/ILinkRepository";
import { ReorderLinksDTO } from "./ReorderLinksDTO";
import { ValidationError } from "@/@core/domain/errors/ValidationError";
import { LinkId } from "@/@core/domain/value-objects/LinkId";
import { UserId } from "@/@core/domain/value-objects/UserId";

@injectable()
export class ReorderLinksUseCase {
  constructor(
    @inject("ILinkRepository")
    private linkRepository: ILinkRepository
  ) {}

  async execute(data: ReorderLinksDTO): Promise<void> {
    try {
      const userId = UserId.create(data.userId);

      if (!data.links || data.links.length === 0) {
        throw new ValidationError("Links to reorder must be provided.");
      }

      const existingLinks = await this.linkRepository.findLinksByUserId(
        userId.getValue()
      );

      const existingLinkIds = new Set(existingLinks.map((link) => link.id));
      for (const link of data.links) {
        const linkId = LinkId.create(link.id);
        if (!existingLinkIds.has(linkId.getValue())) {
          throw new ValidationError(
            `Link with ID ${linkId.getValue()} does not exist or does not belong to the user.`
          );
        }
      }

      for (const link of data.links) {
        const linkToUpdate = existingLinks.find((l) => l.id === link.id);
        if (linkToUpdate) {
          linkToUpdate.props.order = link.order;
          await this.linkRepository.updateLink(linkToUpdate);
        }
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new Error(`Validation failed: ${error.message}`);
      }

      throw new Error(`Failed to reorder links: ${(error as Error).message}`);
    }
  }
}
