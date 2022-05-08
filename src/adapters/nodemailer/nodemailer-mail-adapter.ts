import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
	host: "smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "66b2715080cbda",
		pass: "9ef16e8e6cd0b5"
	}
});

export class NodemailerMailAdapter implements MailAdapter {
	async sendMail({ body, subject }: SendMailData) {
		transport.sendMail({
			from: "Equipe Feedget <oi@feedget.com>",
			to: "Matheus Ferreira da Silva <maatheusfs12@gmail.com>",
			subject,
			html: body
		})
	};
}