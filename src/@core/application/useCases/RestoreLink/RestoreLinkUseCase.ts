import { inject, injectable } from 'inversify';
import type { ILinkRepository } from '@/@core/domain/repositories/ILinkRepository';
import { RestoreLinkDTO } from './RestoreLinkDTO';
import { ValidationError } from '@/@core/domain/errors/ValidationError';
import { LinkId } from '@/@core/domain/value-objects/LinkId';

@injectable()
export class RestoreLinkUseCase {
  constructor(
    @inject('ILinkRepository')
    private linkRepository: ILinkRepository
  ) {}

  async execute(data: RestoreLinkDTO): Promise<void> {
    const linkId = LinkId.create(data.id);

    const link = await this.linkRepository.findLinkById(linkId.getValue());

    if (!link) {
      throw new ValidationError('Link not found.');
    }

    if (link.userId !== data.userId) {
      throw new ValidationError('You are not authorized to archive this link.');
    }

    const maxOrder = await this.linkRepository.getMaxOrderForLinks(data.userId);

    link.setOrder(maxOrder + 1);

    link.unarchive();

    await this.linkRepository.updateLink(link);
  }
}
