import { Controller, Post, Body } from '@nestjs/common';
import { ItineraryService } from './itinerary.service';

@Controller('itinerary')
export class ItineraryController {
  constructor(private itineraryService: ItineraryService) {}

  @Post('recommend')
  async recommendItinerary(@Body() data: any) {
    return this.itineraryService.recommendItinerary(data);
  }
}