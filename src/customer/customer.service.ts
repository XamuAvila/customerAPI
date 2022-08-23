import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Prisma, Customer } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CustomerService {
    constructor(@Inject() private prisma: PrismaService) { }

    async createCustomer(data: Prisma.CustomerCreateInput): Promise<Customer> {
        return this.prisma.customer.create({ data });
    }

    async getCustomer(id: string): Promise<Customer | null> {
        const foundCustomer = await this.prisma.customer.findFirst({ where: { id: id } });
        if (foundCustomer) {
            return foundCustomer;
        }
        throw new BadRequestException("Costumer Not Found");
    }

    async updateCustomer(id: string, data: Prisma.CustomerUpdateInput): Promise<Customer> {
        const foundCostumer = await this.prisma.customer.findFirst({ where: { id: id } });
        if (foundCostumer) {
            const where: Prisma.CustomerWhereUniqueInput = { id: id };
            return this.prisma.customer.update({
                data,
                where
            })
        }
        throw new BadRequestException('Not found customer')
    }
}
