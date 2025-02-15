import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { differenceInDays, format, addDays } from 'date-fns';

@Injectable()
export class ItineraryService {
  private genAI: GoogleGenerativeAI;

  constructor(private prisma: PrismaService) {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_API_KEY is not defined');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async recommendItinerary(data: {
    situation: string;
    budgetPerPerson: number;
    province: string;
    district: string;
    startDate: string;
    endDate: string;
    preferences: string[];
  }): Promise<any> {
    const { situation, budgetPerPerson, province, district, startDate, endDate, preferences } = data;

    // Step 1: Fetch places from the database
    const places = await this.prisma.place.findMany({
      where: {
        Province: { title: province },
        District: { title: district },
      },
    });

    if (places.length === 0) {
      throw new Error('No places found in the specified province and district.');
    }

    // Step 2: Prepare the prompt for the LLM
    const prompt = this.createPrompt(places, {
      situation,
      budgetPerPerson,
      startDate,
      endDate,
      preferences,
    });

    // Step 3: Call the LLM
    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    const itinerary = result.response.text();

    // Step 4: Return the itinerary
    return { itinerary };
  }

  private createPrompt(
    places: any[],
    options: {
      situation: string;
      budgetPerPerson: number;
      startDate: string;
      endDate: string;
      preferences: string[];
    },
  ): string {
    const { situation, budgetPerPerson, startDate, endDate, preferences } = options;

    const totalDays = differenceInDays(new Date(endDate), new Date(startDate)) + 1;

    const placeDetails = places
      .map(
        (place) =>
          `- ${place.title}: ${place.description}. Category: ${place.category}. Price per person: ${place.pricePerPerson}.`,
      )
      .join('\n');

    return `
      Create a detailed travel itinerary for a ${situation} trip with the following details:
      - Budget per person: ${budgetPerPerson}
      - Duration: ${totalDays} days (from ${startDate} to ${endDate})
      - Preferences: ${preferences.join(', ')}

      Available places:
      ${placeDetails}

      Plan each day with activities, meals, and breaks. Ensure the total cost per person does not exceed the budget. Include:
      - Morning activities
      - Lunch at a restaurant
      - Afternoon activities
      - Dinner at a restaurant
      - Optional evening activities

      Return the itinerary in JSON format with the following structure:
      {
        "days": [
          {
            "date": "YYYY-MM-DD",
            "activities": [
              {
                "time": "HH:MM",
                "place": "Place Name",
                "description": "Activity description",
                "costPerPerson": 0
              }
            ]
          }
        ],
        "totalCostPerPerson": 0
      }
    `;
  }
}