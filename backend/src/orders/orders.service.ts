import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from '../../generated/prisma/enums';


@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productsService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: number) {
    // 👇 TIPADO CORRECTO
    const items: {
      productId: number;
      quantity: number;
      price: number;
    }[] = [];

    for (const item of createOrderDto.products) {
      const product = await this.productsService.findOne(item.productId);

      if (!product) {
        throw new NotFoundException(
          `Product with id ${item.productId} not found`,
        );
      }

      items.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price * item.quantity,
      });
    }

    return this.prisma.order.create({
      data: {
        description: createOrderDto.description,
        userId,
        items: {
          create: items,
        },
        totalPrice: items.reduce((sum, i) => sum + i.price, 0),
      },
    });
  }
  async findAll() {
    return this.prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                image: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  async findMyOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // 🆕 DETALLE DE UNA ORDEN
  async findOne(orderId: number, userId: number, role: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // 🔐 Si no es ADMIN, solo puede ver sus órdenes
    if (role !== 'ADMIN' && order.userId !== userId) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async updateStatus(orderId: number, status: OrderStatus) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }

}
