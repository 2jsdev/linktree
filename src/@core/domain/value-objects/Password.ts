import bcrypt from 'bcrypt';

export class Password {
  private constructor(private readonly value: string) {}

  public static async create(password: string): Promise<Password> {
    if (!this.isValid(password)) {
      throw new Error('Password does not meet security criteria');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return new Password(hashedPassword);
  }

  private static isValid(password: string): boolean {
    return password.length >= 8;
  }

  public getValue(): string {
    return this.value;
  }

  public async compare(plainTextPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, this.value);
  }
}
