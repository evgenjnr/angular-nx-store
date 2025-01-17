import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Users } from '../users/entities/users.entity';
import { IUser } from '../users/models/user.interface';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { BcryptService } from '../app-utils/bcrypt.service';
import { JwtPayload } from './models/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService
  ) {}

  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  async validateUser(email: string, pass: string): Promise<IUser | null> {
    const user = await this.userService.findOneByEmail(email);

    const isMatch = await this.bcryptService.bcryptPasswordCompare(
      pass,
      user.password
    );

    if (isMatch) {
      const { password, ...restUserData } = user;

      return restUserData;
    }

    return null;
  }

  async signIn(user: IUser): Promise<{ access_token: string } | undefined> {
    // generate and return JWT
    const payload: JwtPayload = {
      sub: user.id,
      username: user.userName,
      email: user.email,
    };

    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
    };
  }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
