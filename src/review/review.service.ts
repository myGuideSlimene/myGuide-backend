import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Review } from '@prisma/client';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Review[]> {
    return this.prisma.review.findMany();
  }

  async findOne(id: string): Promise<Review | null> {
    return this.prisma.review.findUnique({ where: { reviewId: id } });
  }

  async create(data: Omit<Review, 'reviewId'>): Promise<Review> {
    return this.prisma.review.create({ data });
  }

  async update(id: string, data: Partial<Review>): Promise<Review> {
    return this.prisma.review.update({ where: { reviewId: id }, data });
  }

  async delete(id: string): Promise<Review> {
    return this.prisma.review.delete({ where: { reviewId: id } });
  }
}