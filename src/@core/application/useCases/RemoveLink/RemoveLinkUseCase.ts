import { inject, injectable } from 'inversify';
import type { ILinkRepository } from '@/@core/domain/repositories/ILinkRepository';
import { RemoveLinkDTO } from './RemoveLinkDTO';
import { ValidationError } from '@/@core/domain/errors/ValidationError';
import { LinkId } from '@/@core/domain/value-objects/LinkId';

@injectable()
export class RemoveLinkUseCase {
  constructor(
    @inject('ILinkRepository')
    private linkRepository: ILinkRepository
  ) {}

  async execute(data: RemoveLinkDTO): Promise<void> {
    const linkId = LinkId.create(data.id);

    const link = await this.linkRepository.findLinkById(linkId.getValue());

    if (!link) {
      throw new ValidationError('Link not found.');
    }

    if (link.userId !== data.userId) {
      throw new ValidationError('You are not authorized to delete this link.');
    }

    await this.linkRepository.deleteLink(link);
  }
}
