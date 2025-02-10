import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Itinerary, Prisma } from '@prisma/client';
import { InputJsonValue } from '@prisma/client/runtime/library';

@Injectable()
export class ItineraryService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Itinerary[]> {
    return this.prisma.itinerary.findMany();
  }

  async findOne(id: string): Promise<Itinerary | null> {
    return this.prisma.itinerary.findUnique({ where: { itineraryId: id } });
  }

  async create(data: Omit<Itinerary, 'itineraryId'> & { places: InputJsonValue }): Promise<Itinerary> {
    return this.prisma.itinerary.create({ data });
  }

  async update(id: string, data: Prisma.ItineraryUpdateInput): Promise<Itinerary> {
    return this.prisma.itinerary.update({ where: { itineraryId: id }, data });
  }

  async delete(id: string): Promise<Itinerary> {
    return this.prisma.itinerary.delete({ where: { itineraryId: id } });
  }
}