import {User} from "../models/user.model";
import {BaseRepo} from "./base.repo";

export class UserRepo extends BaseRepo<User> {
    constructor() {
        super(User);
    }

}