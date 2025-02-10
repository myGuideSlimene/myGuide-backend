import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PaymentInformationService } from './payment-information.service';
import { PaymentInformation } from '@prisma/client';

@Controller('payment-information')
export class PaymentInformationController {
  constructor(private paymentInformationService: PaymentInformationService) {}

  @Get()
  async findAll(): Promise<PaymentInformation[]> {
    return this.paymentInformationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PaymentInformation | null> {
    return this.paymentInformationService.findOne(id);
  }

  @Post()
  async create(@Body() data: Omit<PaymentInformation, 'paymentId'>): Promise<PaymentInformation> {
    return this.paymentInformationService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<PaymentInformation>): Promise<PaymentInformation> {
    return this.paymentInformationService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<PaymentInformation> {
    return this.paymentInformationService.delete(id);
  }
}