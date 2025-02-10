import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentInformation } from '@prisma/client';

@Injectable()
export class PaymentInformationService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<PaymentInformation[]> {
    return this.prisma.paymentInformation.findMany();
  }

  async findOne(id: string): Promise<PaymentInformation | null> {
    return this.prisma.paymentInformation.findUnique({ where: { paymentId: id } });
  }

  async create(data: Omit<PaymentInformation, 'paymentId'>): Promise<PaymentInformation> {
    return this.prisma.paymentInformation.create({ data });
  }

  async update(id: string, data: Partial<PaymentInformation>): Promise<PaymentInformation> {
    return this.prisma.paymentInformation.update({ where: { paymentId: id }, data });
  }

  async delete(id: string): Promise<PaymentInformation> {
    return this.prisma.paymentInformation.delete({ where: { paymentId: id } });
  }
}