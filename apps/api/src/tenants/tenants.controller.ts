import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiProperty } from "@nestjs/swagger";
import { PrismaService } from "../prisma/prisma.service";

export class TenantResponse {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({ type: String, format: "date-time" })
  createdAt!: Date;

  @ApiProperty({ type: String, format: "date-time" })
  updatedAt!: Date;
}

@Controller("tenants")
export class TenantsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: TenantResponse, isArray: true })
  listTenants(): Promise<TenantResponse[]> {
    return this.prisma.tenant.findMany({
      select: { id: true, name: true, createdAt: true, updatedAt: true },
      orderBy: { name: "asc" },
    });
  }
}
