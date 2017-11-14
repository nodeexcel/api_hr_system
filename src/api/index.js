import { Router } from 'express';
import controller from "../controller";

export default () => {
    let api = Router({ mergeParams: true });
    api.route('/user/attendance/').post(controller.upload.attendance);
    api.route('/user/get_user_list/').post(controller.stats.list);
    api.route('/attendance/update_time_by_employee').post(controller.upload.attendanceByEmployee);
    api.route('/attendance/manual/').post(controller.fetch.manualUpdatedAttendance);
    api.route('/attendance/approval').post(controller.fetch.approvalAction);
    api.route('/reports/get_team_stats').post(controller.stats.graphStats);
    api.route('/reports/get_termination_joining_stats').post(controller.stats.joiningTerminatiionStats);
    api.route('/reports/get_employee_hours').post(controller.stats.EmployeeHours);
    api.route('/reports/get_monthly_report').post(controller.stats.monthlyReport);
    api.route('/xyz').get(controller.stats.abc);
    api.route('/reports/get_monthly_performance').post(controller.stats.monthlyPerformance);
    api.route('/user/forgot_password').post(controller.forgot_password.change_password);
    return api;
}