export default () => ({
  port: Number(process.env.PORT ?? 5002),  
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT ?? 1521) ,
    username: process.env.DB_USERNAME || 'miniproject',
    password: process.env.DB_PASSWORD || '123456',
    sid: process.env.DB_SID || 'FREEPDB1',
  },
  nodeEnv: process.env.NODE_ENV || 'development',
});
