import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from '@prisma/client';

@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get()
  async findAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Review | null> {
    return this.reviewService.findOne(id);
  }

  @Post()
  async create(@Body() data: Omit<Review, 'reviewId'>): Promise<Review> {
    return this.reviewService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Review>): Promise<Review> {
    return this.reviewService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Review> {
    return this.reviewService.delete(id);
  }
}