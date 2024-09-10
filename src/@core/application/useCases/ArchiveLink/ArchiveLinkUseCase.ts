import { inject, injectable } from 'inversify';
import type { ILinkRepository } from '@/@core/domain/repositories/ILinkRepository';
import { ArchiveLinkDTO } from './ArchiveLinkDTO';
import { ValidationError } from '@/@core/domain/errors/ValidationError';
import { LinkId } from '@/@core/domain/value-objects/LinkId';

@injectable()
export class ArchiveLinkUseCase {
  constructor(
    @inject('ILinkRepository')
    private linkRepository: ILinkRepository
  ) {}

  async execute(data: ArchiveLinkDTO): Promise<void> {
    const linkId = LinkId.create(data.id);

    const link = await this.linkRepository.findLinkById(linkId.getValue());

    if (!link) {
      throw new ValidationError('Link not found.');
    }

    if (link.userId !== data.userId) {
      throw new ValidationError('You are not authorized to archive this link.');
    }

    link.archive();

    await this.linkRepository.updateLink(link);
  }
}
