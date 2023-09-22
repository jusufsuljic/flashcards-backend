export const config = (): GatewayConfigProps => ({
    gateway_port: parseInt(process.env.GATEWAY_PORT, 10) || 8000,
    jwt_secret: process.env.JWT_SECRET
});