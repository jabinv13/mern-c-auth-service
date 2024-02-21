import { config } from "dotenv";
// eslint-disable-next-line
config();

const { PORT, NODE_ENV } = process.env;

export const Config = {
    PORT,
    NODE_ENV,
};
