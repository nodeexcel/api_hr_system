import { Router } from 'express';
import controller from "../controller";

export default () => {
    let api = Router({ mergeParams: true });

    api.route('/user/attendance/').post(controller.upload.attendance);
    api.route('/attendance/update_time_by_employee').post(controller.upload.attendanceByEmployee);
    api.route('/attendance/manual/').post(controller.fetch.manualUpdatedAttendance);
    api.route('/attendance/approval').post(controller.fetch.approvalAction);
    api.route('/reports/get_termination_joining_stats').post(controller.stats.joiningTerminatiionStats);

    return api;
}