import { v4 as uuidv4 } from "uuid";

export class UserId {
  private constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error("Invalid User ID format");
    }
  }

  private isValid(id: string): boolean {
    return /^[a-zA-Z0-9-]+$/.test(id);
  }

  public static create(id?: string): UserId {
    return new UserId(id ?? uuidv4());
  }

  public getValue(): string {
    return this.value;
  }
}
