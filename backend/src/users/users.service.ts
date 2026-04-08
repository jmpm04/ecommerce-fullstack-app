import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../services/prisma.service';



@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}


  async create(createUserDto: CreateUserDto) {
    try{
      await this.prismaService.user.create({
        data: {
          email: createUserDto.email,
          name: createUserDto.name,
          password : createUserDto.password,
          birthDate : createUserDto.birthDate ,
          role: 'USER',
        },
      });
      return 'This action adds a new user';
    }catch(error:unknown){
      console.log(error);
      return 'Error creating user';
    }

  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique(
      { where: { id } },
    );
    if (!user) {
      throw new NotFoundException(
        'User with id ${id} not found',
      );
    }
    return user;
  }

  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
