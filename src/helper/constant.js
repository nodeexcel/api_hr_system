 // module.exports={
 export default function() {

     const constant = {
         PAGE_home: 101,
         PAGE_monthly_attendance: 102,
         PAGE_inventory_system: 103,
         PAGE_manage_payslips: 104,
         PAGE_manage_working_hours: 105,
         PAGE_holidays: 107,
         PAGE_team_view: 108,
         PAGE_apply_leave: 109,
         PAGE_manage_leaves: 110,
         PAGE_my_leaves: 111,
         PAGE_disabled_employes: 112,
         PAGE_manage_user_working_hours: 113,
         PAGE_leaves_summary: 114,
         PAGE_salary: 115,
         PAGE_manage_salary: 116,
         PAGE_my_profile: 117,
         PAGE_my_inventory: 118,
         PAGE_manage_users: 119,
         PAGE_manage_clients: 120,
         PAGE_forgot_password: 121,
         PAGE_documents: 122,
         PAGE_uploadAttendance: 123,
         PAGE_view_salary: 124,
         PAGE_policy_documents: 125,
         PAGE_upload_policy_documents: 126,
         PAGE_add_variables: 127,
         PAGE_mail_templates: 128,
         PAGE_login: 129,
         PAGE_manage_roles: 130,
         PAGE_manage_user_pending_hours: 131,
         PAGE_logout: 132,


         //action
         ACTION_working_hours_summary: 201,
         ACTION_add_new_employee: 202,
         ACTION_add_user_working_hours: 203,
         ACTION_get_user_worktime_detail: 204,
         ACTION_update_user_day_summary: 205,
         ACTION_change_leave_status: 206,
         ACTION_get_my_leaves: 207,
         ACTION_get_enable_user: 208,
         ACTION_month_attendance: 209,
         ACTION_get_all_leaves: 210,
         ACTION_apply_leave: 211,
         ACTION_show_disabled_users: 212,
         ACTION_change_employee_status: 213,
         ACTION_get_holidays_list: 214,
         ACTION_admin_user_apply_leave: 215,
         ACTION_update_new_password: 216,
         ACTION_get_managed_user_working_hours: 217,
         ACTION_get_user_previous_month_time: 218,
         ACTION_get_all_user_previous_month_time: 219,
         ACTION_update_day_working_hours: 220,
         ACTION_delete_employee: 221,
         ACTION_add_hr_comment: 222,
         ACTION_add_extra_leave_day: 222,
         ACTION_send_request_for_doc: 223,
         ACTION_update_user_entry_exit_time: 224,
         ACTION_save_google_payslip_drive_access_token: 225,
         ACTION_attendance_summary: 226,
         ACTION_user_day_summary: 227,
         ACTION_get_all_leaves_summary: 228,
         ACTION_get_users_leaves_summary: 229,
         ACTION_get_user_role_from_slack_id: 230,
         ACTION_get_all_not_approved_leave_of_user: 231,
         ACTION_approve_decline_leave_of_user: 232,
         // ACTION_cancel_applied_leave:233,  // since this is also user in sal_info/api.php
         ACTION_cancel_applied_leave_admin: 234,
         ACTION_get_all_leaves_of_user: 235,
         ACTION_get_user_current_status: 236,
         ACTION_get_role_from_slackid: 237,
         ACTION_updatebandwidthstats: 238,
         ACTION_save_bandwidth_detail: 239,
         ACTION_get_bandwidth_detail: 240,
         ACTION_validate_unique_key: 241,
         ACTION_send_slack_msg: 242,
         ACTION_get_all_users_detail: 243,

         ACTION_get_all_clients: 301,
         ACTION_get_client_detail: 302,
         ACTION_create_new_client: 303,
         ACTION_update_client_details: 304,
         ACTION_create_client_invoice: 305,
         ACTION_delete_invoice: 306,


         ACTION_delete_role: 401,
         ACTION_assign_user_role: 402,
         ACTION_list_all_roles: 403,
         ACTION_update_role: 404,
         ACTION_add_roles: 405,

         ACTION_get_machine_count: 501,
         ACTION_get_machine_status_list: 502,
         ACTION_add_machine_status: 503,
         ACTION_add_machine_type: 504,
         ACTION_get_machine_type_list: 505,
         ACTION_delete_machine_status: 506,
         ACTION_add_office_machine: 507,
         ACTION_update_office_machine: 508,
         ACTION_get_machine: 509,
         ACTION_get_machines_detail: 510,
         ACTION_remove_machine_detail: 511,
         ACTION_assign_user_machine: 512,
         ACTION_get_user_machine: 513,

         //actions not required token
         ACTION_login: 601,
         ACTION_logout: 602,
         ACTION_forgot_password: 603,
         ACTION_get_days_between_leaves: 604,

         //template actions
         ACTION_get_template_variable: 701,
         ACTION_create_template_variable: 702,
         ACTION_update_template_variable: 703,
         ACTION_delete_template_variable: 704,
         ACTION_get_email_template: 705,
         ACTION_create_email_template: 706,
         ACTION_update_email_template: 707,
         ACTION_delete_email_template: 708,
         ACTION_get_email_template_byId: 709,

         //team actions
         ACTION_add_team_list: 801,
         ACTION_get_team_list: 802,
         ACTION_get_team_users_detail: 803,

         //policy documents
         ACTION_get_user_policy_document: 901,
         ACTION_update_user_policy_document: 902,
         ACTION_get_policy_document: 903,
         ACTION_save_policy_document: 904,

         //lunch actions
         ACTION_get_lunch_stats: 700,

         ACTION_get_lunch_break_detail: 700,

         ACTION_lunch_break: 700,


         // profile, employee, salary .bank
         ACTION_get_user_profile_detail: 800,

         ACTION_update_user_profile_detail: 800,

         ACTION_update_user_bank_detail: 800,

         ACTION_create_user_salary: 800,

         ACTION_create_employee_salary_slip: 800,

         ACTION_get_user_manage_payslips_data: 800,

         ACTION_get_user_document: 800,

         ACTION_delete_user_document: 800,

         ACTION_delete_salary: 800,

         ACTION_send_payslips_to_employees: 801,

         ACTION_send_employee_email: 801,

         ACTION_cancel_applied_leave: 801,

         ACTION_create_pdf: 801,

         ACTION_update_read_document: 801,

         ACTION_get_user_salary_info: 801,

         ACTION_get_user_profile_detail_by_id: 801,

         ACTION_update_user_profile_detail_by_id: 801,

         ACTION_update_user_bank_detail_by_id: 801,

         ACTION_get_user_document_by_id: 801,

         ACTION_get_user_salary_info_by_id: 802,


         ACTION_get_employee_life_cycle: 802,

         ACTION_update_employee_life_cycle: 802,


         //notification
         NOTIFICATION_apply_leave: 100,

         NOTIFICATION_update_leave_status: 100,

         NOTIFICATION_add_user_working_hours: 100

     }
     return constant;
 }