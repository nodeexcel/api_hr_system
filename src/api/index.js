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
    api.route('/reports/get_termination_joining_stats').post(auth.verifyUserAction, controller.stats.joiningTerminatiionStats);
    api.route('/reports/get_employee_hours').post(auth.verifyUserAction, controller.stats.EmployeeHours);
    api.route('/reports/get_monthly_report').post(controller.stats.monthlyReport);
    api.route('/xyz').get(controller.stats.abc);
    api.route('/reports/get_monthly_performance').post(controller.stats.monthlyPerformance);

    return api;
}