import { Router } from 'express';
import controller from "../controller";
import auth from '../middleware'

export default () => {
    let api = Router({ mergeParams: true });

    api.route('/user/attendance/').post(auth.verifyUserAction, controller.upload.attendance);
    api.route('/attendance/update_time_by_employee').post(auth.verifyUserAction, controller.upload.attendanceByEmployee);
    api.route('/attendance/manual/').post(auth.verifyUserAction, controller.fetch.manualUpdatedAttendance);
    api.route('/attendance/approval').post(auth.verifyUserAction, controller.fetch.approvalAction);
    api.route('/reports/get_team_stats').post(auth.verifyUserAction, controller.stats.graphStats);

    return api;
}