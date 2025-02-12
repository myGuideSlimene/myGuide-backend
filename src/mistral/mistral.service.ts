import { Injectable } from '@nestjs/common';
// import { Mistral } from 'mistralai';
import { Mistral } from "@mistralai/mistralai";


@Injectable()
export class MistralService {
  private client: Mistral;

  constructor() {
    this.client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });
  }

  async generateItinerary(prompt: string): Promise<string> {
    const response = await this.client.chat.complete({
      model: 'mistral-large-latest', // Use the desired model
      messages: [{ role: 'user', content: prompt }],
    });

    if (!response.choices || response.choices.length === 0) {
      throw new Error('Invalid response choices');
    }
    const content = response.choices[0].message.content;
    if (typeof content === 'string') {
      return content;
    }
    throw new Error('Invalid response content');
  }
}