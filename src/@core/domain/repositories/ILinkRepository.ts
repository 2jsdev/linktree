import { Link } from '../entities/Link';

export interface ILinkRepository {
  findLinkById(id: string): Promise<Link | null>;
  findLinksByUserId(userId: string): Promise<Link[]>;
  createLink(link: Link): Promise<Link>;
  updateLink(link: Link): Promise<Link>;
  deleteLink(link: Link): Promise<void>;
  getMaxOrderForLinks(userId: string): Promise<number>;
  reorderLinks(
    userId: string,
    orderedLinks: { id: string; order: number }[]
  ): Promise<void>;
}
