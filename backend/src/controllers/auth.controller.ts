import {Request, Response} from "express";
import {AuthService} from "../services/auth.service";


export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    async register(req: Request, res: Response) {
        try {
            const {email, password} = req.body;
            const user = await this.authService.register({email, password});
            req.session.userId = user.id;

            res.status(201).json({userId: user.id, email: user.email})
        } catch (err: any) {
            if (err.message === 'User already exists') {
                return res.status(409).json({message: err.message});
            }
            return res.status(500).json({message: err.message});
        }
    }

    async login(req: Request, res: Response) {
        try {
            const {email, password} = req.body;
            const user = await this.authService.login({email, password});
            req.session.userId = user.id;
            res.json({userId: user.id, email: user.email});
        } catch (err: any) {
            res.status(500).json({message: err.message});
        }
    }

    // async me(req: Request, res: Response) {
    //     try {
    //         if(!req.session.userId) return res.status(401).json({message: 'Unauthorized'});
    //         res.json({userId:req.session.userId});
    //     }catch (err: any) {
    //         res.status(500).json({message: err.message});
    //     }
    //
    // }
    async logout(req: Request, res: Response) {
        try {
            req.session.destroy();
            res.json({message: 'Logged out'});
        } catch (err: any) {
            res.status(500).json({message: err.message});
        }
    }
}