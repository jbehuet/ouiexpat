import { Transporter, createTransport } from 'nodemailer';
import { SmtpOptions } from 'nodemailer-smtp-transport';
import { compile } from 'handlebars';
import * as path from 'path';
import * as fs from 'fs';

import CONFIG from '../config';

class MailHelper {

    private _transporter: Transporter;
    private _enabled: boolean;

    constructor() {
        this._enabled = (CONFIG.mailer.host);
        console.log("Mailer : " + (this._enabled ? 'enabled' : 'disabled'));
        if (this._enabled) {
            const smtp: SmtpOptions = CONFIG.mailer;
            this._transporter = createTransport(smtp)
        }
    }

    public send(subject: string, template: string, content: any, email: string) {

        const source = fs.readFileSync(path.join(__dirname, '../templates/' + template + '.hbs'), 'utf8');
        const hbs = compile(source)

        const mailOptions = {
            from: `"OuiExpat" <${CONFIG.mailer.from}>`,
            to: email,
            subject: 'OuiExpat | ' + subject,
            html: hbs(content)
        };

        this._transporter.sendMail(mailOptions, function(err, info) {
            if (err) return console.log(JSON.stringify(err));
            if (info) return console.log(JSON.stringify(info));
            return null;
        });
    }

}

export default MailHelper
