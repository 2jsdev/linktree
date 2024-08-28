import { Link } from "@/@core/domain/entities/Link";
import { LinkId } from "@/@core/domain/value-objects/LinkId";
import { Url } from "@/@core/domain/value-objects/Url";
import { UserId } from "@/@core/domain/value-objects/UserId";

export class LinkMapper {
  static toDomain(link: any): Link {
    return Link.create({
      id: LinkId.create(link.id),
      label: link.label,
      url: Url.create(link.url),
      visible: link.visible,
      order: link.order,
      archived: link.archived,
      createdAt: link.createdAt,
      userId: UserId.create(link.userId),
    });
  }
  static toPersistence(link: Link): any {
    return {
      id: link.id,
      label: link.label,
      url: link.url,
      visible: link.visible,
      order: link.order,
      archived: link.archived,
      createdAt: link.createdAt,
      userId: link.userId,
    };
  }
}
