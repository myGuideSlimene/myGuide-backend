import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MistralService } from '../mistral/mistral.service';
import { Itinerary, Prisma } from '@prisma/client';

@Injectable()
export class ItineraryService {
  constructor(
    private prisma: PrismaService,
    private mistralService: MistralService,
  ) {}

  async generateItinerary(data: {
    situation: string;
    budgetPerPerson: number;
    provinceId: string;
    startDate: string;
    endDate: string;
    preferences: string[];
    otherDetails: string[];
  }): Promise<Itinerary> {
    // Generate a prompt for the AI
    const prompt = `Create a detailed itinerary for a ${data.situation} trip in province ${data.provinceId} with a budget of ${data.budgetPerPerson} per person. 
    The trip starts on ${data.startDate} and ends on ${data.endDate}. Preferences: ${data.preferences.join(', ')}. 
    Other details: ${data.otherDetails.join(', ')}. Include restaurants, cafes, and relaxation spots.`;

    // Get the itinerary from the AI
    const itineraryDetails = await this.mistralService.generateItinerary(prompt);

    // Store the itinerary in the database
    const itinerary = await this.prisma.itinerary.create({
      data: {
        userId: 'user-id', // Replace with actual user ID
        provinceId: data.provinceId,
        districtId: 'district-id', // Replace with actual district ID
        totalPrice: data.budgetPerPerson, // Adjust based on AI output
        places: JSON.parse(itineraryDetails), // Parse AI output as JSON
      },
    });

    return itinerary;
  }
}