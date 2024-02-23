import request from "supertest";
import app from "../../src/app";
import { DataSource } from "typeorm";
import { User } from "../../src/entity/User";
import { AppDataSource } from "../../src/config/data-source";
import { Roles } from "../../src/constants";
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

        it("should return an id of the created user ", async () => {
            const userData = {
                firstName: "Jabin",
                lastName: "v",
                email: "jabinv@mern.auth",
                password: "secret",
            };

            //ACT

            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            //assert
            expect(response.body).toHaveProperty("id");
            const repository = connection.getRepository(User);
            const users = await repository.find();
            expect((response.body as Record<string, string>).id).toBe(
                users[0].id,
            );
        });

        it("should assign a customer role", async () => {
            const userData = {
                firstName: "Jabin",
                lastName: "v",
                email: "jabinv@mern.auth",
                password: "secret",
            };

            //ACT

            await request(app).post("/auth/register").send(userData);

            //ASSERT
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();

            expect(users[0]).toHaveProperty("role");
            expect(users[0].role).toBe(Roles.CUSTOMER);
        });
    });

    describe("Fields are missing", () => {});
});
