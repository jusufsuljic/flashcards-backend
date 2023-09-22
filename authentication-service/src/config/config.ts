export const config = (): AuthServiceConfigProps => ({
    jwt_secret: process.env.JWT_SECRET
});