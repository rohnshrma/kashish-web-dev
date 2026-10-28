import { config } from "dotenv";
config();

const { MONGO_URI, JWT_SECRET } = process.env;

if (!MONGO_URI || !JWT_SECRET) {
  console.error("MONGO_URI and JWT_SECRET must be set in .env");
  process.exit(1);
}

export const PORT = process.env.PORT || 5000;
export { MONGO_URI, JWT_SECRET };
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
