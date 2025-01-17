import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IUserResponse } from './user-response.interface';

export class IUser extends OmitType(PartialType(IUserResponse), ['password']) {}
