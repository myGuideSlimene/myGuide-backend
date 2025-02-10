import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Reservation } from '@prisma/client';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Reservation[]> {
    return this.prisma.reservation.findMany();
  }

  async findOne(id: string): Promise<Reservation | null> {
    return this.prisma.reservation.findUnique({ where: { reservationId: id } });
  }

  async create(data: Omit<Reservation, 'reservationId'> & { timeInterval: any }): Promise<Reservation> {
    return this.prisma.reservation.create({ data: { ...data, timeInterval: data.timeInterval as any } });
  }

  async update(id: string, data: Partial<Reservation>): Promise<Reservation> {
    const { reservationId, ...updateData } = data;
    return this.prisma.reservation.update({ where: { reservationId: id }, data: updateData as any });
  }

  async delete(id: string): Promise<Reservation> {
    return this.prisma.reservation.delete({ where: { reservationId: id } });
  }
}