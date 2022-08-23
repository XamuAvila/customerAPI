import { CustomerService } from '../customer.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';

const customerArray = [
  {
    id: '299bdf08-5f38-4f49-ab5a-7b2e68a4f692',
    name: 'Test Customer',
    document: 12345678912
  },
  {
    id: '399bdf08-5f38-4f49-ab5a-7b2e68a4f69a',
    name: 'Test Customer 2',
    document: 12345678912
  },
];

const oneCustomer = customerArray[0];

const db = {
  customer: {
    findMany: jest.fn().mockResolvedValue(customerArray),
    findUnique: jest.fn().mockResolvedValue(oneCustomer),
    findFirst: jest.fn().mockResolvedValue(oneCustomer),
    create: jest.fn().mockReturnValue(oneCustomer),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(oneCustomer),
    delete: jest.fn().mockResolvedValue(oneCustomer),
  },
};

describe('CustomerService', () => {
  let service: CustomerService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: db,
        },
        CustomerService,
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('Get Customer', () => {
    it('should return a customer', async () => {
      const costumer = await service.getCustomer('anyId');
      expect(costumer).toEqual(oneCustomer);
    });
  });

  describe('Create Customer', () => {
    it('should successfully create a customer', () => {
      expect(
        service.createCustomer({
          name: 'Test',
          document: 12345678923
        }),
      ).resolves.toEqual(oneCustomer);
    });
  });

  describe('Update', () => {
    it('should call the update method', async () => {
      const customer = await service.updateCustomer('a uuid', {
        name: 'Updated',
        document: 2345678912
      });
      expect(customer).toEqual(oneCustomer);
    });
  });
});
