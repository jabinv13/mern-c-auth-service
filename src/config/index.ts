import { config } from "dotenv";
// eslint-disable-next-line
config();

const { PORT } = process.env;

export const Config = {
    PORT,
};
