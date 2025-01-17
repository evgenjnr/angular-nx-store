import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { IUser } from '../../users/models/user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, pass: string): Promise<IUser | undefined> {
    const user: IUser = await this.authService.validateUser(email, pass);
    if (!user)
      throw new NotFoundException(
        'Authorization - User not found or credentials are invalid'
      );
    return user;
  }
}
