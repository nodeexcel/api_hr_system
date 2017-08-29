import { Router } from 'express';
import form from "./form";

export default () => {
    let api = Router();

    api.route('/user/attendance/').post(form.attendance);

    return api;
}