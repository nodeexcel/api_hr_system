import { Router } from 'express';
import account from "./form";

export default () => {
    let api = Router();

    api.route('/user/attendance/').post(account.attendance);

    return api;
}