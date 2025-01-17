import * as bcrypt from 'bcrypt';

export class BcryptService {
  #bcrypt = bcrypt;
  #saltRounds = 10;

  async bcryptHashPassword(payloadPassword: string): Promise<string> {
    const hashedPassword = await this.#bcrypt.hash(
      payloadPassword,
      this.#saltRounds
    );

    return hashedPassword;
  }

  async bcryptPasswordCompare(
    payloadPassword: string,
    dbPassword: string
  ): Promise<boolean> {
    const isMatch = await this.#bcrypt.compare(payloadPassword, dbPassword);

    return isMatch;
  }
}
