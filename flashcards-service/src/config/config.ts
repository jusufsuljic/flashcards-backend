export const config = (): FlashcardsServiceConfigProps => ({
    service_port: parseInt(process.env.SERVICE_PORT, 10) || 4200,
    secret_key: process.env.SECRET_KEY,
    db_connection_string: process.env.DATABASE_URL
});