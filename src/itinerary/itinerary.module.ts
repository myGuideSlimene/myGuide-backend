import { Module } from '@nestjs/common';
import { ItineraryService } from './itinerary.service';
import { ItineraryController } from './itinerary.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ItineraryController],
  providers: [ItineraryService, PrismaService],
})
export class ItineraryModule {}