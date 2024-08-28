import { inject, injectable } from "inversify";
import type { ILinkRepository } from "@/@core/domain/repositories/ILinkRepository";
import { GetUserLinkListDTO } from "./GetUserLinkListDTO";
import { ValidationError } from "@/@core/domain/errors/ValidationError";
import { Link } from "@/@core/domain/entities/Link";
import { UserId } from "@/@core/domain/value-objects/UserId";

@injectable()
export class GetUserLinkListUseCase {
  constructor(
    @inject("ILinkRepository")
    private linkRepository: ILinkRepository
  ) {}

  async execute(data: GetUserLinkListDTO): Promise<Link[]> {
    try {
      const userId = UserId.create(data.userId);

      const links = await this.linkRepository.findLinksByUserId(
        userId.getValue()
      );

      if (!links || links.length === 0) {
        return [];
      }

      return links;
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new Error(`Validation failed: ${error.message}`);
      }

      throw new Error(`Failed to list links: ${(error as Error).message}`);
    }
  }
}
