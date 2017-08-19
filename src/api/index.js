import { Router } from 'express';
import account from "./facets";

export default () => {
    let api = Router();
    console.log("routes")
    api.route('/user/attendance/').post(account.attendance);

    return api;
}