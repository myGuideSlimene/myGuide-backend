import { Module } from '@nestjs/common';
import { PaymentInformationService } from './payment-information.service';
import { PaymentInformationController } from './payment-information.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PaymentInformationController],
  providers: [PaymentInformationService, PrismaService],
})
export class PaymentInformationModule {}