import {BaseRepo} from "./base.repo";
import { Dial} from "../models/dial.model";

export class DialRepo extends BaseRepo<Dial> {
    constructor(){
        super(Dial);
    }
}

