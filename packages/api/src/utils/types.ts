import { Prisma, PrismaClient } from '@prisma/client';

export interface MyContext extends Request {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  userId: (authToken?: string | undefined) => string;
}
