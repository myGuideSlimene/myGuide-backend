import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Province, Prisma } from '@prisma/client';

@Injectable()
export class ProvinceService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Province[]> {
    return this.prisma.province.findMany();
  }

  async findOne(id: string): Promise<Province | null> {
    return this.prisma.province.findUnique({ where: { provinceId: id } });
  }

  async create(data: Omit<Province, 'provinceId'> & { coordinates: any }): Promise<Province> {
    return this.prisma.province.create({ data: { ...data, coordinates: data.coordinates as any } });
  }

  async update(id: string, data: Partial<Province>): Promise<Province> {
    return this.prisma.province.update({ where: { provinceId: id }, data: { ...data, coordinates: data.coordinates as any as Prisma.InputJsonValue } });
  }

  async delete(id: string): Promise<Province> {
    return this.prisma.province.delete({ where: { provinceId: id } });
  }
}