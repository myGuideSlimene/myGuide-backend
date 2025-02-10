import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PlaceService } from './place.service';
import { Place } from '@prisma/client';

@Controller('places')
export class PlaceController {
  constructor(private placeService: PlaceService) {}

  @Get()
  async findAll(): Promise<Place[]> {
    return this.placeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Place | null> {
    return this.placeService.findOne(id);
  }

  @Post()
  async create(@Body() data: Omit<Place, 'placeId'>): Promise<Place> {
    return this.placeService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Omit<Place, 'coordinates'> & { coordinates: any }): Promise<Place> {
    return this.placeService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Place> {
    return this.placeService.delete(id);
  }
}