export class Url {
  private constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error("Invalid URL format");
    }
  }

  private isValid(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  public static create(url: string): Url {
    return new Url(url);
  }

  public getValue(): string {
    return this.value;
  }
}
