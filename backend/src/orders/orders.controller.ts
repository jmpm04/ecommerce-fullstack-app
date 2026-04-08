import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Param,
  Patch
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { OrderStatus } from '../../generated/prisma/enums';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateOrderDto, @Req() req) {
    // 👇 userId sale del JWT
    return this.ordersService.create(dto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('my')
  findMyOrders(@Req() req) {
    return this.ordersService.findMyOrders(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Get()
  findAll(@Req() req) {
    return this.ordersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.ordersService.findOne(
      Number(id),
      req.user.sub,
      req.user.role,
    );
  }

  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: OrderStatus },
  ) {
    return this.ordersService.updateStatus(Number(id), body.status);
  }



}
