/**
 * Returns a configuration object for the FlashcardsService.
 * @returns {FlashcardsServiceConfigProps} - The configuration object with the following properties:
 * - service_port: The port number for the service. Defaults to 4200 if not provided in the environment variables.
 * - secret_key: The secret key for the service. Retrieved from the environment variables.
 * - db_connection_string: The connection string for the database. Retrieved from the environment variables.
 */
export const config = (): FlashcardsServiceConfigProps => ({
    service_port: parseInt(process.env.SERVICE_PORT, 10) || 4200,
    secret_key: process.env.SECRET_KEY,
    db_connection_string: process.env.DATABASE_URL
});