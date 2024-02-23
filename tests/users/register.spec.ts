import request from "supertest";
import app from "../../src/app";

describe("POST /auth/register", () => {
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
                email: "jain@mern.auth",
                password: "secret",
            };

            //ACT

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            //assert
        });
    });

    describe("Fields are missing", () => {});
});
