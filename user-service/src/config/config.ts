/**
 * Returns a configuration object for the UserService.
 * @returns {UserServiceConfigProps} - The configuration object with the following properties:
 * - service_port: The port number for the service. Defaults to 3001 if not provided in the environment variables.
 * - db_connection_string: The connection string for the database. Retrieved from the DATABASE_URL environment variable.
 */
export const config = (): UserServiceConfigProps => ({
    service_port: parseInt(process.env.SERVICE_PORT, 10) || 3001,
    db_connection_string: process.env.DATABASE_URL
});