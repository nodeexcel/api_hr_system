import { Router } from 'express';
import upload from "./upload.js";

export default () => {
    let api = Router();

    api.route('/user/attendance/').get(upload.attendance);
    api.route('/attendance/update_time_by_employee').get(upload.attendanceByEmployee);

    return api;
}