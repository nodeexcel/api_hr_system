import { Router } from 'express';
import upload from "../controller/upload.js";
import fetch from "../controller/manualAttendance.js"

export default () => {
    let api = Router();

    api.route('/user/attendance/').get(upload.attendance);
    api.route('/attendance/update_time_by_employee').get(upload.attendanceByEmployee);
    api.route('/attendance/manual/').get(fetch.manualUpdatedAttendance);
    api.route('/attendance/approval').get(fetch.approvalAction);

    return api;
}