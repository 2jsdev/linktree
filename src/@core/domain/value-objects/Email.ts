export class Email {
  private constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error("Invalid email format");
    }
  }

  private isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public static create(email: string): Email {
    return new Email(email);
  }

  public getValue(): string {
    return this.value;
  }
}
