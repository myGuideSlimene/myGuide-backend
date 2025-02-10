import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ItineraryService } from './itinerary.service';
import { Itinerary, Prisma } from '@prisma/client';
import { InputJsonValue } from '@prisma/client/runtime/library';

@Controller('itineraries')
export class ItineraryController {
  constructor(private itineraryService: ItineraryService) {}

  @Get()
  async findAll(): Promise<Itinerary[]> {
    return this.itineraryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Itinerary | null> {
    return this.itineraryService.findOne(id);
  }

  @Post()
  async create(@Body() data: Omit<Itinerary, 'itineraryId'> & { places: InputJsonValue }): Promise<Itinerary> {
    return this.itineraryService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.ItineraryUpdateInput,
  ): Promise<Itinerary> {
    return this.itineraryService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Itinerary> {
    return this.itineraryService.delete(id);
  }
}