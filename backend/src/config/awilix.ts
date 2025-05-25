import {createContainer, asClass, asValue, asFunction} from 'awilix';
import {Dial} from "../models/dial.model";
import {DialRepo} from "../repositories/dial.repo";
import {DialService} from "../services/dial.service";
import {DialController} from "../controllers/dial.controller";
import dialRouter from "../routes/dial.router";
import {DialQueue} from "../queues/dial.queue";
import {User} from "../models/user.model";
import {UserRepo} from "../repositories/user.repo";
import {AuthService} from "../services/auth.service";
import {AuthController} from "../controllers/auth.controller";
import {EmailService} from "../services/email.service";
import nodemailer from "nodemailer";
import authRouter from "../routes/auth.router";
import {EMAIL, EMAIL_PASSWORD} from "../constants";


const container = createContainer({
    injectionMode: 'CLASSIC',
});

container.register({
    Dial: asValue(Dial),
    User: asValue(User),

    dialRepo: asClass(DialRepo).singleton(),
    userRepo: asClass(UserRepo).singleton(),

    dialService: asClass(DialService).singleton(),
    authService: asClass(AuthService).singleton(),
    emailService: asFunction(async () => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: EMAIL_PASSWORD,

            },
        });

        return new EmailService(transporter);
    }).singleton(),


    dialController: asClass(DialController).singleton(),
    authController: asClass(AuthController).singleton(),

    dialRouter: asFunction(dialRouter).singleton(),
    authRouter: asFunction(authRouter).singleton(),

    dialQueue: asClass(DialQueue).singleton()


})
export default container;