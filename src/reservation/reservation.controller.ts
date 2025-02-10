import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Reservation } from '@prisma/client';

@Controller('reservations')
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  @Get()
  async findAll(): Promise<Reservation[]> {
    return this.reservationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Reservation | null> {
    return this.reservationService.findOne(id);
  }

  @Post()
  async create(@Body() data: Omit<Reservation, 'reservationId'>): Promise<Reservation> {
    return this.reservationService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Reservation>): Promise<Reservation> {
    return this.reservationService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Reservation> {
    return this.reservationService.delete(id);
  }
}