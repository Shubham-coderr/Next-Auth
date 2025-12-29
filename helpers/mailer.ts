import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

interface SendEmailParams {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: SendEmailParams) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "05ac48112625ff",
        pass: "da4c687dfe0575",
      },
    });

    const isVerify = emailType === "VERIFY";

    const actionPath = isVerify ? "verifyemail" : "resetpassword";
    const actionText = isVerify ? "Verify your email" : "Reset your password";
    const actionLink = `${process.env.DOMAIN}/${actionPath}?token=${hashedToken}`;

    const mailOptions = {
      from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${actionLink}">Here</a> to ${actionText.toLowerCase()} or copy paste the link below in your browser.
      <br> 
      <a href=${actionLink}>${actionLink}</a>
      </p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
