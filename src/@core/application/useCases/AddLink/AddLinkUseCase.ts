import { inject, injectable } from "inversify";
import type { ILinkRepository } from "@/@core/domain/repositories/ILinkRepository";
import { AddLinkDTO } from "./AddLinkDTO";
import { Link } from "@/@core/domain/entities/Link";
import { Url } from "@/@core/domain/value-objects/Url";
import { LinkId } from "@/@core/domain/value-objects/LinkId";
import { UserId } from "@/@core/domain/value-objects/UserId";

@injectable()
export class AddLinkUseCase {
  constructor(
    @inject("ILinkRepository")
    private linkRepository: ILinkRepository
  ) {}

  async execute(data: AddLinkDTO): Promise<Link> {
    const newLink = Link.create({
      id: LinkId.create(),
      label: data.label,
      url: Url.create(data.url),
      visible: data.visible ?? true,
      order: data.order,
      userId: UserId.create(data.userId),
      createdAt: new Date(),
      archived: false,
    });

    const createdLink = await this.linkRepository.createLink(newLink);

    return createdLink;
  }
}
