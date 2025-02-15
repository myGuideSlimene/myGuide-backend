import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chat')
export class ChatbotController {
  constructor(private readonly ChatbotService: ChatbotService) {}

  @Post('message')
  async sendMessage(@Body('prompt') prompt: string): Promise<{ response: string }> {
    const response = await this.ChatbotService.generateContent(prompt);
    return { response };
  }
}