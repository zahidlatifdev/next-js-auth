import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendMail = async ({email, emailType, userId}:any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                VerifyToken: hashedToken,
                VerifyTokenExpiry: Date.now() + 3600000
            });
        } else if(emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                ForgotPasswordToken: hashedToken,
                ForgotPasswordTokenExpiry: Date.now() + 3600000
            });
        }


        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });

        const mailOptions = {
            from: 'devtesting@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: emailType === "VERIFY" ?
                `<a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Click here to verify your email</a>`
                : `<a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Click here to reset your password</a>`
        }

        const mailresponse = await transporter.sendMail(mailOptions);

        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}
