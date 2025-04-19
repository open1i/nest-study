export default () => ({
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.PORT!, 10) || 3000,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  app: {
    port: parseInt(process.env.PORT!, 10) || 3000,
    nodeEnv: process.env.NODE_ENV,
  },
});
