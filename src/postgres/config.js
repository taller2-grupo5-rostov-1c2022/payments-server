const baseConfig = {
  connectionString: process.env.DATABASE_URL,
};

const isProd = (process.env.WORKING_ENV || "dev") === "prod";

export const config = isProd ? baseConfig : { ...baseConfig, ssl: { rejectUnauthorized: false } };
