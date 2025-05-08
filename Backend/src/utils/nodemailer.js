import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host:process.env.SMTP_USER,
    port:process.env.SMTP_PORT,
    auth:{
        user:process.env.SMTP_LOGIN,
        pass:process.env.SMTP_PASS
    }
})

export default transporter