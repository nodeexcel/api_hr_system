import { Router } from 'express';
import controller from "../controller";

export default () => {
    let api = Router();

    api.route('/user/attendance/').get(controller.upload.attendance);
    api.route('/attendance/update_time_by_employee').get(controller.upload.attendanceByEmployee);
    api.route('/attendance/manual/').get(controller.fetch.manualUpdatedAttendance);
    api.route('/attendance/approval').get(controller.fetch.approvalAction);
    api.route('/reports/get_team_stats').post(controller.stats.teamStats);

    return api;
}