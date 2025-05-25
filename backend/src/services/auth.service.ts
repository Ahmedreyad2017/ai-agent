import {UserRepo} from "../repositories/user.repo";
import bcrypt from "bcrypt";

export class AuthService {
    constructor(private readonly userRepo: UserRepo) {

    }

    async register({email, password}: { email: string; password: string }) {
        const existingUser = await this.userRepo.findOne({where: {email}});
        if (existingUser) throw new Error('User already exists');
        const hashed = await bcrypt.hash(password, 10);
        return this.userRepo.create({email, password: hashed});
    }

    async login({email, password}: { email: string; password: string }) {
        const user = await this.userRepo.findOne({where: {email}});
        if (!user) throw new Error('User not found');
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error('Invalid password');
        return user;
    }
}