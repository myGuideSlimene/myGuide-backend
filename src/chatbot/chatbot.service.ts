import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ChatbotService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private prisma: PrismaClient;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    this.prisma = new PrismaClient();
  }

  /**
   * Generate a response using the Gemini API and database data.
   */
  async generateContent(prompt: string): Promise<string> {
    try {
      // Fetch relevant data from the database based on the prompt
      const context = await this.getContextFromDatabase(prompt);

      // Combine the prompt with the fetched data
      const fullPrompt = `${prompt}\n\nContext:\n${JSON.stringify(context)}`;

      // Generate content using Gemini API
      const result = await this.model.generateContent(fullPrompt);
      return result.response.text();
    } catch (error) {
      throw new Error(`Failed to generate content: ${error.message}`);
    }
  }

  /**
   * Fetch relevant data from the database based on the prompt.
   */
  private async getContextFromDatabase(prompt: string): Promise<any> {
    // Extract keywords or entities from the prompt
    const keywords = this.extractKeywords(prompt);

    // Fetch relevant data based on the keywords
    if (keywords.province) {
      return this.getProvinceDetails(keywords.province);
    } else if (keywords.district) {
      return this.getDistrictDetails(keywords.district);
    } else if (keywords.place) {
      return this.getPlaceDetails(keywords.place);
    } else {
      return this.getAllProvinces();
    }
  }

  /**
   * Extract keywords from the prompt.
   */
  private extractKeywords(prompt: string): { province?: string; district?: string; place?: string } {
    // Simple keyword extraction (you can use NLP libraries for better accuracy)
    const lowerCasePrompt = prompt.toLowerCase();
    return {
      province: lowerCasePrompt.match(/province\s+(\w+)/)?.[1],
      district: lowerCasePrompt.match(/district\s+(\w+)/)?.[1],
      place: lowerCasePrompt.match(/place\s+(\w+)/)?.[1],
    };
  }

  /**
   * Fetch details of a specific province.
   */
  private async getProvinceDetails(provinceTitle: string): Promise<any> {
    return this.prisma.province.findFirst({
      where: { title: provinceTitle },
      include: { districts: true, places: true },
    });
  }

  /**
   * Fetch details of a specific district.
   */
  private async getDistrictDetails(districtTitle: string): Promise<any> {
    return this.prisma.district.findFirst({
      where: { title: districtTitle },
      include: { bestPlaces: true, Province: true },
    });
  }

  /**
   * Fetch details of a specific place.
   */
  private async getPlaceDetails(placeTitle: string): Promise<any> {
    return this.prisma.place.findFirst({
      where: { title: placeTitle },
      include: { Province: true, District: true },
    });
  }

  /**
   * Fetch all provinces.
   */
  private async getAllProvinces(): Promise<any[]> {
    return this.prisma.province.findMany({
      include: { districts: true, places: true },
    });
  }
}