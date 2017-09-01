import { Router } from 'express';
import upload from "./upload.js";

export default () => {
    let api = Router();

    api.route('/user/attendance/').get(upload.attendance);

    return api;
}