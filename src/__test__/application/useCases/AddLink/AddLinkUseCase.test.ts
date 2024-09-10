import { AddLinkUseCase } from '@/@core/application/useCases/AddLink/AddLinkUseCase';
import { Link } from '@/@core/domain/entities/Link';
import { UserId } from '@/@core/domain/value-objects/UserId';
import { MockLinkRepository } from '@/@core/infra/repositories/MockLinkRepository';
import { v4 as uuidv4 } from 'uuid';

describe('AddLinkUseCase', () => {
  let addLinkUseCase: AddLinkUseCase;
  let mockLinkRepository: MockLinkRepository;

  beforeEach(() => {
    mockLinkRepository = new MockLinkRepository();
    addLinkUseCase = new AddLinkUseCase(mockLinkRepository);
  });

  it('should create a new link', async () => {
    const linkData = {
      label: 'Test Link',
      url: 'http://test.com',
      visible: true,
      order: 1,
      userId: uuidv4().replace(/-/g, ''),
    };

    const newLink = await addLinkUseCase.execute(linkData);
    expect(newLink).toBeInstanceOf(Link);
    expect(newLink.label).toBe(linkData.label);
    expect(newLink.url).toBe(linkData.url);
  });
});
