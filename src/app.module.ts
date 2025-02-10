// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// // import { PrismaModule } from './prisma/prisma.module';
// import { PrismaService } from './prisma/prisma.service';
// import { UserModule } from './user/user.module';

// @Module({
//   // imports: [PrismaModule],
//   controllers: [AppController],
//   providers: [AppService, PrismaService],
//   exports: [PrismaService],
//   imports: [UserModule], // Export PrismaService to make it available in other modules
// })
// export class AppModule {}
// import { Module } from '@nestjs/common';
// import { PrismaService } from './prisma/prisma.service';
// import { ProvinceModule } from './province/province.module';
// import { DistrictModule } from './district/district.module';
// import { PlaceModule } from './place/place.module';
// import { ReviewModule } from './review/review.module';
// import { ItineraryModule } from './itinerary/itinerary.module';
// import { ReservationModule } from './reservation/reservation.module';
// import { PaymentInformationModule } from './payment-information/payment-information.module';

// @Module({
//   providers: [PrismaService],
//   exports: [PrismaService],
//   imports: [ProvinceModule, DistrictModule, PlaceModule, ReviewModule, ItineraryModule, ReservationModule, PaymentInformationModule], // Export PrismaService to make it available in other modules
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProvinceModule } from './province/province.module';
import { DistrictModule } from './district/district.module';
import { PlaceModule } from './place/place.module';
import { ReviewModule } from './review/review.module';
import { ItineraryModule } from './itinerary/itinerary.module';
import { ReservationModule } from './reservation/reservation.module';
import { PaymentInformationModule } from './payment-information/payment-information.module';

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
  ],
})
export class AppModule {}