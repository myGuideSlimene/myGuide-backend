import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { District, Prisma } from '@prisma/client';

@Injectable()
export class DistrictService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<District[]> {
    return this.prisma.district.findMany();
  }

  async findOne(id: string): Promise<District | null> {
    return this.prisma.district.findUnique({ where: { districtId: id } });
  }

  async create(data: Omit<District, 'districtId'> & { coordinates: any }): Promise<District> {
    return this.prisma.district.create({ data: { ...data, coordinates: data.coordinates as any } });
  }

  async update(id: string, data: Partial<District>): Promise<District> {
    const { provinceId, ...rest } = data;
    const updateData = {
      ...rest,
      coordinates: rest.coordinates as Prisma.InputJsonValue | undefined,
    };
    return this.prisma.district.update({ where: { districtId: id }, data: updateData });
  }

  async delete(id: string): Promise<District> {
    return this.prisma.district.delete({ where: { districtId: id } });
  }
}