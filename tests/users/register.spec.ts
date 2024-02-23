import request from "supertest";
import app from "../../src/app";
import { DataSource } from "typeorm";
import { User } from "../../src/entity/User";
import { AppDataSource } from "../../src/config/data-source";
// import { truncateTables } from "../utils";

describe("POST /auth/register", () => {
    let connection: DataSource;

    beforeAll(async () => {
        connection = await AppDataSource.initialize();
    });

    beforeEach(async () => {
        // Database truncate
        // await truncateTables(connection);
        // Database truncate
        await connection.dropDatabase();
        await connection.synchronize();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    describe("Given all fields", () => {
        it("should return 201 status code", async () => {
            const userData = {
                firstName: "Jabin",
                lastName: "v",
                email: "jain@mern.auth",
                password: "secret",
            };

            //ACT

            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            //ASSERT

            expect(response.statusCode).toBe(201);
        });

        it("should return valid json response", async () => {
            const userData = {
                firstName: "Jabin",
                lastName: "v",
                email: "jain@mern.auth",
                password: "secret",
            };

            //ACT

            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            // Assert application/json utf-8

            expect(
                (response.headers as Record<string, string>)["content-type"],
            ).toEqual(expect.stringContaining("json"));
        });

        it("should persist the user in the database ", async () => {
            const userData = {
                firstName: "Jabin",
                lastName: "v",
                email: "jabinv@mern.auth",
                password: "secret",
            };

            //ACT

            await request(app).post("/auth/register").send(userData);

            //assert

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();

            expect(users).toHaveLength(1);
        });
    });

    describe("Fields are missing", () => {});
});
