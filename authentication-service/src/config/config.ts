export const config = (): AuthServiceConfigProps => ({
    //auth_service_port: parseInt(process.env.SERVICE_PORT, 10) || 8888,
    jwt_secret: process.env.JWT_SECRET
});