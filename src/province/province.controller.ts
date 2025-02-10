import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { Province } from '@prisma/client';

@Controller('provinces')
export class ProvinceController {
  constructor(private provinceService: ProvinceService) {}

  @Get()
  async findAll(): Promise<Province[]> {
    return this.provinceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Province | null> {
    return this.provinceService.findOne(id);
  }

  @Post()
  async create(@Body() data: Omit<Province, 'provinceId'>): Promise<Province> {
    return this.provinceService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Province>): Promise<Province> {
    return this.provinceService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Province> {
    return this.provinceService.delete(id);
  }
}