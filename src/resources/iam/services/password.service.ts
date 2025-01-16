import {Injectable} from "@nestjs/common";
import * as argon2 from "argon2";

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> | null {
    if (!password) return null;

    try {
      return await argon2.hash(password, {
        type: argon2.argon2id,
        timeCost: 3,
        memoryCost: 2 ** 15,
        parallelism: 1,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async verifyHash(password: string, hash: string) {
    try {
      return await argon2.verify(hash, password);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return false;
    }
  }
}
