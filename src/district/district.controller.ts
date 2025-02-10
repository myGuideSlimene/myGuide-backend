import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DistrictService } from './district.service';
import { District } from '@prisma/client';

@Controller('districts')
export class DistrictController {
  constructor(private districtService: DistrictService) {}

  @Get()
  async findAll(): Promise<District[]> {
    return this.districtService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<District | null> {
    return this.districtService.findOne(id);
  }

  @Post()
  async create(@Body() data: Omit<District, 'districtId'>): Promise<District> {
    return this.districtService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<District>): Promise<District> {
    return this.districtService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<District> {
    return this.districtService.delete(id);
  }
}