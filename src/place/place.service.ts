import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Place } from '@prisma/client';

@Injectable()
export class PlaceService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Place[]> {
    return this.prisma.place.findMany();
  }

  async findOne(id: string): Promise<Place | null> {
    return this.prisma.place.findUnique({ where: { placeId: id } });
  }

  async create(data: Omit<Place, 'placeId'> & { coordinates: any }): Promise<Place> {
    return this.prisma.place.create({ data });
  }

  async update(id: string, data: Omit<Place, 'coordinates'> & { coordinates: any }): Promise<Place> {
    return this.prisma.place.update({ where: { placeId: id }, data });
  }

  async delete(id: string): Promise<Place> {
    return this.prisma.place.delete({ where: { placeId: id } });
  }
}