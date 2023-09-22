/**
 * Returns an object containing the configuration properties for the authentication service.
 * @returns {AuthServiceConfigProps} An object with the JWT secret property.
 */
export const config = (): AuthServiceConfigProps => ({
    jwt_secret: process.env.JWT_SECRET
});