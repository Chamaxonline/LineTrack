import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";

interface TenantItem {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

describe("Tenants (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    process.env.DATABASE_URL =
      process.env.TEST_DATABASE_URL ?? process.env.DATABASE_URL;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    prisma = app.get(PrismaService);

    await prisma.tenant.deleteMany({ where: { name: { startsWith: "e2e-" } } });
    await prisma.tenant.createMany({
      data: [{ name: "e2e-Zulu" }, { name: "e2e-Alpha" }],
    });
  });

  afterAll(async () => {
    await prisma.tenant.deleteMany({ where: { name: { startsWith: "e2e-" } } });
    await app.close();
  });

  it("GET /tenants returns tenants ordered by name", async () => {
    const response = await request(app.getHttpServer()).get("/tenants");
    expect(response.status).toBe(200);
    const body = response.body as TenantItem[];
    expect(Array.isArray(body)).toBe(true);

    const seeded = body.filter((t) => t.name.startsWith("e2e-"));
    expect(seeded.map((t) => t.name)).toEqual(["e2e-Alpha", "e2e-Zulu"]);

    for (const item of body) {
      expect(Object.keys(item).sort()).toEqual(
        ["createdAt", "id", "name", "updatedAt"].sort(),
      );
      expect(new Date(item.createdAt).toISOString()).toBe(item.createdAt);
      expect(new Date(item.updatedAt).toISOString()).toBe(item.updatedAt);
    }
  });

  it("documents GET /tenants in Swagger", () => {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder().build(),
    );
    expect(document.paths["/tenants"].get?.responses["200"]).toBeDefined();
    const schema = document.components?.schemas?.TenantResponse as {
      properties: Record<string, unknown>;
    };
    expect(Object.keys(schema.properties).sort()).toEqual(
      ["createdAt", "id", "name", "updatedAt"].sort(),
    );
  });
});
