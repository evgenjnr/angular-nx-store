import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { BcryptService } from '../app-utils/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly bcrypt: BcryptService
  ) {}
  async create(createUserDto: CreateUserDto) {
    const existingUser: Users | null = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) throw new BadRequestException('User already exist');
    const password = await this.bcrypt.bcryptHashPassword(
      createUserDto.password
    );
    createUserDto = {
      ...createUserDto,
      password,
    };
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return (await this.userRepository.find()).map((user: Users) => {
      const { password, ...restDataUser } = user;
      return restDataUser;
    });
  }

  async findOne(id: number): Promise<Users | undefined> {
    const existingUser: Users | null = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingUser) throw new NotFoundException('User does not exist');

    return existingUser;
  }
  async findOneByEmail(email: string): Promise<Users | undefined> {
    const existingUser: Users | null = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!existingUser) throw new NotFoundException('User does not exist');

    return existingUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
