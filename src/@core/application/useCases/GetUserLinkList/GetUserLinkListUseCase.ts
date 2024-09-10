import { inject, injectable } from 'inversify';
import type { ILinkRepository } from '@/@core/domain/repositories/ILinkRepository';
import { GetUserLinkListDTO } from './GetUserLinkListDTO';
import { Link } from '@/@core/domain/entities/Link';
import { UserId } from '@/@core/domain/value-objects/UserId';

@injectable()
export class GetUserLinkListUseCase {
  constructor(
    @inject('ILinkRepository')
    private linkRepository: ILinkRepository
  ) {}

  async execute(data: GetUserLinkListDTO): Promise<Link[]> {
    const userId = UserId.create(data.userId);

    const links = await this.linkRepository.findLinksByUserId(
      userId.getValue()
    );

    if (!links || links.length === 0) {
      return [];
    }

    return links;
  }
}
