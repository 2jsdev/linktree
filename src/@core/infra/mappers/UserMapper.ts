import { User, UserProps } from "@/@core/domain/entities/User";
import { Link } from "@/@core/domain/entities/Link";
import { LinkMapper } from "./LinkMapper";
import { UserId } from "@/@core/domain/value-objects/UserId";
import { Email } from "@/@core/domain/value-objects/Email";

export class UserMapper {
  static toDomain(raw: any): User {
    const links = raw.links?.map((link: any) => LinkMapper.toDomain(link));

    const userProps: UserProps = {
      id: UserId.create(raw.id),
      name: raw.name,
      email: Email.create(raw.email),
      username: raw.username,
      image: raw.image,
      links: links,
    };

    return User.create(userProps);
  }

  static toPersistence(user: User): any {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      image: user.image,
      links: user.links?.map((link: Link) => ({
        id: link.id,
        label: link.label,
        url: link.url,
        visible: link.visible,
        order: link.order,
        createdAt: link.createdAt,
        userId: link.userId,
      })),
    };
  }
}
