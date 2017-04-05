const CONFIG = {
    rollbar: process.env.ROLLBAR_API || '',
    port: process.env.PORT ||  3000,
    jwt: {
        secret: process.env.TOKEN_SECRET || 'monsecret',
        options: { expiresIn: 30 * 60 }
    },
    mongodb: {
        uri: process.env.MONGODB_URI ||  'mongodb://localhost:27017/ouiexpat',
    }
};

export default CONFIG
