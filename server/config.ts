import * as dotenv from 'dotenv';
// LOAD DOTENV CONFIGURATION
dotenv.config({path: './dist/server/.env'});

const CONFIG = {
    rollbar: process.env.ROLLBAR_API || '',
    port: process.env.PORT || 3000,
    jwt: {
        secret: process.env.TOKEN_SECRET || 'monsecret',
        options: { expiresIn: 30 * 60 },
        reset_options: { expiresIn: 120 * 60 }
    },
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ouiexpat',
    },
    mailer: {
        from: process.env.EMAIL_FROM_ADDR || 'no-reply@ouiexpat.com',
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    },
    url:{
      reset_password:process.env.RESET_URL || 'http://localhost:4200/auth/reset_password/'
    }
};

export default CONFIG
