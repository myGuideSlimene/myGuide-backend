import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chat')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('message')
  async sendMessage(@Body('prompt') prompt: string): Promise<{ response: string }> {
    const response = await this.chatbotService.generateContent(prompt);
    return { response };
  }
}