import { Module } from '@nestjs/common';
import { ItineraryService } from './itinerary.service';
import { ItineraryController } from './itinerary.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MistralService } from '../mistral/mistral.service';

@Module({
  controllers: [ItineraryController],
  providers: [ItineraryService, PrismaService, MistralService],
})
export class ItineraryModule {}