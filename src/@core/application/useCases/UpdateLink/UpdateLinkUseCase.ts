import { inject, injectable } from 'inversify';
import type { ILinkRepository } from '@/@core/domain/repositories/ILinkRepository';
import { UpdateLinkDTO } from './UpdateLinkDTO';
import { ValidationError } from '@/@core/domain/errors/ValidationError';
import { Url } from '@/@core/domain/value-objects/Url';
import { Link } from '@/@core/domain/entities/Link';
import { LinkId } from '@/@core/domain/value-objects/LinkId';
import { UserId } from '@/@core/domain/value-objects/UserId';

@injectable()
export class UpdateLinkUseCase {
  constructor(
    @inject('ILinkRepository')
    private linkRepository: ILinkRepository
  ) {}

  async execute(data: UpdateLinkDTO): Promise<Link> {
    const linkId = LinkId.create(data.id);

    const existingLink = await this.linkRepository.findLinkById(
      linkId.getValue()
    );
    if (!existingLink) {
      throw new ValidationError('Link not found.');
    }

    const updatedUrl = data.url ? Url.create(data.url) : existingLink.props.url;

    const updatedLink = Link.create({
      id: linkId,
      label: data.label ?? existingLink.label,
      url: updatedUrl,
      visible: data.visible ?? existingLink.visible,
      order: data.order ?? existingLink.order,
      userId: UserId.create(existingLink.userId),
      createdAt: existingLink.createdAt,
      archived: existingLink.archived,
    });

    const result = await this.linkRepository.updateLink(updatedLink);

    return result;
  }
}
