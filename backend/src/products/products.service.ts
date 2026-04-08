import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService} from '../services/prisma.service';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {constructor(private readonly prismaService: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    try {
      await this.prismaService.product.create({
        data: {
          name: createProductDto.name,
          description: createProductDto.description,
          category: createProductDto.category,
          price: createProductDto.price,
          image: createProductDto.image,
        },
      });
      return "this action adds a new product";
    }catch(error:unknown){
      console.log(error);
      return 'Error creating products';
    }
  }

  async findAll(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }

  async findOne(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: {id},
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async findByCategory(category: string): Promise<Product[]> {
  return this.prismaService.product.findMany({
    where: {category: category.toLowerCase()},
  })
  }

  async update (id: number, updateProductDto: UpdateProductDto) {
    return this.prismaService.product.update({
      where: {id},
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.product.delete({
      where: {id},
    });
  }
}
