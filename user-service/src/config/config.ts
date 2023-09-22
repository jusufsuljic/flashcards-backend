export const config = (): UserServiceConfigProps => ({
    service_port: parseInt(process.env.SERVICE_PORT, 10) || 3001,
    db_connection_string: process.env.DATABASE_URL
});