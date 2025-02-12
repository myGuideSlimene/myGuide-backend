import { Controller, Post, Body } from '@nestjs/common';
import { ItineraryService } from './itinerary.service';
import { Itinerary } from '@prisma/client';

@Controller('itinerary')
export class ItineraryController {
  constructor(private itineraryService: ItineraryService) {}

  @Post('recommend')
  async recommendItinerary(
    @Body()
    data: {
      situation: string;
      budgetPerPerson: number;
      provinceId: string;
      startDate: string;
      endDate: string;
      preferences: string[];
      otherDetails: string[];
    },
  ): Promise<Itinerary> {
    return this.itineraryService.generateItinerary(data);
  }
}