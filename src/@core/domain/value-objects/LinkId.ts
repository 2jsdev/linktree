import { v4 as uuidv4 } from 'uuid';

export class LinkId {
  private constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error('Invalid Link ID format');
    }
  }

  private isValid(id: string): boolean {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      id
    );
  }

  public static create(id?: string): LinkId {
    return new LinkId(id ?? uuidv4());
  }

  public getValue(): string {
    return this.value;
  }
}
