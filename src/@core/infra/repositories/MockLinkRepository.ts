import { ILinkRepository } from '@/@core/domain/repositories/ILinkRepository';
import { Link } from '@/@core/domain/entities/Link';

export class MockLinkRepository implements ILinkRepository {
  private links: Link[] = [];

  async findLinkById(id: string): Promise<Link | null> {
    return this.links.find((link) => link.id === id) || null;
  }

  async findLinksByUserId(userId: string): Promise<Link[]> {
    return this.links.filter((link) => link.userId === userId);
  }

  async createLink(link: Link): Promise<Link> {
    this.links.push(link);
    return link;
  }

  async updateLink(link: Link): Promise<Link> {
    const index = this.links.findIndex((l) => l.id === link.id);
    if (index !== -1) {
      this.links[index] = link;
      return link;
    }
    throw new Error('Link not found');
  }

  async deleteLink(link: Link): Promise<void> {
    this.links = this.links.filter((l) => l.id !== link.id);
  }

  async getMaxOrderForLinks(userId: string): Promise<number> {
    const userLinks = this.links.filter((link) => link.userId === userId);
    return userLinks.length > 0
      ? Math.max(...userLinks.map((link) => link.order))
      : 0;
  }

  async reorderLinks(
    userId: string,
    orderedLinks: { id: string; order: number }[]
  ): Promise<void> {
    orderedLinks.forEach(({ id, order }) => {
      const link = this.links.find((link) => link.id === id);
      if (link) {
        link.setOrder(order);
      }
    });
  }
}
