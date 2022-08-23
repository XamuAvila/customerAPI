import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, customer } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async createCustomer(data: Prisma.customerCreateInput): Promise<customer> {
    return this.prisma.customer.create({ data });
  }

  async getCustomer(id: string): Promise<customer> {
    const foundCustomer = await this.prisma.customer.findFirst({
      where: { id: id },
    });
    if (foundCustomer) {
      return foundCustomer;
    }
    throw new BadRequestException('Costumer Not Found');
  }

  async updateCustomer(
    id: string,
    data: Prisma.customerUpdateInput,
  ): Promise<customer> {
    const foundCostumer = await this.prisma.customer.findFirst({
      where: { id: id },
    });
    if (foundCostumer) {
      const where: Prisma.customerWhereUniqueInput = { id: id };
      return this.prisma.customer.update({
        data,
        where,
      });
    }
    throw new BadRequestException('Not found customer');
  }
}
