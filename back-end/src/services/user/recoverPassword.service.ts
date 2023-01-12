import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import nodemailer from "nodemailer";
import { AppError } from "../../errors/AppError";

const recoverPasswordService = async (email: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { email } });

  if (!user) {
    throw new AppError("User not found, token may be invalid", 404);
  }

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3c8db797d42450",
      pass: "9d10126dc22160",
    },
  });

  const mailOptions = {
    from: "motors.affiliation@kenzie.com",
    to: email,
    subject: "Password recovery request",
    text: `Hello, ${user.name}!
    
    Access the link below to change your password.
    http://localhost:5173/recovery/${user.id}
    `,
  };

  transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent:" + info.response);
    }
  });
};

export default recoverPasswordService;
