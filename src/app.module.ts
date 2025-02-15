import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProvinceModule } from './province/province.module';
import { DistrictModule } from './district/district.module';
import { PlaceModule } from './place/place.module';
import { ReviewModule } from './review/review.module';
import { ItineraryModule } from './itinerary/itinerary.module';
import { ReservationModule } from './reservation/reservation.module';
import { PaymentInformationModule } from './payment-information/payment-information.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { PrismaService } from './prisma/prisma.service';
import { MistralService } from './mistral/mistral.service';
import { ChatbotService } from './chatbot/chatbot.service';


@Module({
  imports: [
    UserModule,
    ProvinceModule,
    DistrictModule,
    PlaceModule,
    ReviewModule,
    ItineraryModule,
    ReservationModule,
    PaymentInformationModule,
    ChatbotModule,
  ],
  providers: [PrismaService, MistralService, ChatbotService], // Add PrismaService and MistralService here
  exports: [PrismaService], // Export PrismaService to make it available in other modules
})
export class AppModule {}