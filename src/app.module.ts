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
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Export PrismaService to make it available in other modules
})
export class AppModule {}