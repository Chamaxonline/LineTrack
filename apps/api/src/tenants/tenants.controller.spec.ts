import { PrismaService } from "../prisma/prisma.service";
import { TenantsController } from "./tenants.controller";

describe("TenantsController", () => {
  it("returns tenants ordered by name", async () => {
    const rows = [
      {
        id: "1",
        name: "Alpha",
        createdAt: new Date("2026-01-01T00:00:00.000Z"),
        updatedAt: new Date("2026-01-02T00:00:00.000Z"),
      },
    ];
    const findMany = jest.fn().mockResolvedValue(rows);
    const prisma = { tenant: { findMany } } as unknown as PrismaService;
    const controller = new TenantsController(prisma);

    await expect(controller.listTenants()).resolves.toEqual(rows);
    expect(findMany).toHaveBeenCalledWith({
      select: { id: true, name: true, createdAt: true, updatedAt: true },
      orderBy: { name: "asc" },
    });
  });
});
