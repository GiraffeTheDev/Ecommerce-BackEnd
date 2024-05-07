const nodemailer = require("nodemailer");

export const handleSendMail = async ({ to, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.email.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  const info = await transporter.sendMail({
    from: '"Dao Viet Anh 👻" <vietanhdao883@gmail.com>', // sender address
    to: { to },
    subject: "Order Receive",
    html: { html }, // html body
  });
};
