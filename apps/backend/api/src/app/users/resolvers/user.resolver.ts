import { Resolver } from '@nestjs/graphql';
import { UsersService } from '../users.service';
import { CurrentUser } from '../decorators/user.decorator';
import { Users } from '../entities/users.entity';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  async whoAmI(@CurrentUser() user: Users) {
    return await this.userService.findOne(user.id);
  }
}
