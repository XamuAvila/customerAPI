import { Customer } from '@prisma/client';
import { CreateCustomerDto } from './dto/createCustomerDto';
import { CustomerService } from './customer.service';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) { }

    @Post()
    async createCustomer(@Body() data: CreateCustomerDto): Promise<Customer> {
        return this.customerService.createCustomer(data);
    }

    @Get(':id')
    async getCustomer(@Param('id') id: string): Promise<Customer> {
        return this.customerService.getCustomer(id);
    }

    @Put(':id')
    async updateCustomer(@Param('id') id: string, @Body() data: CreateCustomerDto) : Promise<Customer> {
        return this.customerService.updateCustomer(id, data);
    }
}
