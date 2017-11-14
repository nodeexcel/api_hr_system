  import constant from "./constant.js";

  export default function() {
      const array = [{
              "id": constant().PAGE_home,
              "name": "home",
              "actions_list": [{ "id": constant().ACTION_month_attendance, "name": "month_attendance" },
                  { "id": constant().ACTION_update_user_day_summary, "name": "update_user_day_summary" },
                  { "id": constant().ACTION_user_day_summary, "name": "user_day_summary" }
              ]
          },

          {
              "id": constant().PAGE_monthly_attendance,
              "name": "monthly_attendance",
              "actions_list": [{ "id": constant().ACTION_working_hours_summary, "name": "working_hours_summary" },
                  { "id": constant().ACTION_add_new_employee, "name": "add_new_employee" },
                  { "id": constant().ACTION_add_user_working_hours, "name": "add_user_working_hours" }
              ]

          },
          {
              "id": constant().PAGE_inventory_system,
              "name": "inventory_system",
              "actions_list": [{ "id": constant().ACTION_get_machines_detail, "name": "get_machines_detail" },
                  { "id": constant().ACTION_get_machine_type_list, "name": "get_machine_type_list" },
                  { "id": constant().ACTION_get_machine_count, "name": "get_machine_count" },
                  { "id": constant().ACTION_get_machine_status_list, "name": "get_machine_status_list" },
                  { "id": constant().ACTION_add_machine_status, "name": "add_machine_status" },
                  { "id": constant().ACTION_add_machine_type, "name": "add_machine_type" },
                  { "id": constant().ACTION_delete_machine_status, "name": "delete_machine_status" },
                  { "id": constant().ACTION_add_office_machine, "name": "add_office_machine" },
                  { "id": constant().ACTION_update_office_machine, "name": "update_office_machine" },
                  { "id": constant().ACTION_remove_machine_detail, "name": "remove_machine_detail" },
                  { "id": constant().ACTION_assign_user_machine, "name": "assign_user_machine" },
                  { "id": constant().ACTION_get_user_machine, "name": "get_user_machine" },
                  { "id": constant().ACTION_get_machine, "name": "get_machine" }
              ]
          },


          {
              "id": constant().PAGE_manage_working_hours,
              "name": "manage_working_hours",
              "actions_list": [{ "id": constant().ACTION_working_hours_summary, "name": "working_hours_summary" },
                  { "id": constant().ACTION_update_day_working_hours, "name": "update_day_working_hours" }
              ]
          },

          {
              "id": constant().PAGE_holidays,
              "name": "holidays",
              "actions_list": [{ "id": constant().ACTION_get_holidays_list, "name": "get_holidays_list" }]
          },

          {
              "id": constant().PAGE_team_view,
              "name": "team_view",
              "actions_list": [{ "id": constant().ACTION_add_team_list, "name": "add_team_list" },
                  { "id": constant().ACTION_get_team_list, "name": "get_team_list" },
                  { "id": constant().ACTION_get_team_users_detail, "name": "get_team_users_detail" }
              ]
          },

          {
              "id": constant().PAGE_apply_leave,
              "name": "apply_leave",
              "actions_list": [{ "id": constant().ACTION_apply_leave, "name": "apply_leave" }]
          },

          {
              "id": constant().PAGE_my_leaves,
              "name": "my_leaves",
              "actions_list": [{ "id": constant().ACTION_get_my_leaves, "name": "get_my_leaves" },
                  { "id": constant().ACTION_cancel_applied_leave, "name": "cancel_applied_leave" }
              ]
          },

          {
              "id": constant().PAGE_disabled_employes,
              "name": "disabled_employes",
              "actions_list": [{ "id": constant().ACTION_show_disabled_users, "name": "show_disabled_users" },
                  { "id": constant().ACTION_change_employee_status, "name": "change_employee_status" }
              ]
          },



          {
              "id": constant().PAGE_leaves_summary,
              "name": "leaves_summary",
              "actions_list": [{ "id": constant().ACTION_get_all_leaves_summary, "name": "get_all_leaves_summary" }]
          },

          {
              "id": constant().PAGE_salary,
              "name": "salary",
              "actions_list": []
          },

          { "id": constant().PAGE_manage_salary, "name": "manage_salary" },
          {
              "id": constant().PAGE_my_profile,
              "name": "my_profile",
              "actions_list": [{ "id": constant().ACTION_get_user_profile_detail, "name": "get_user_profile_detail" },
                  { "id": constant().ACTION_update_user_bank_detail, "name": "update_user_bank_detail" },
                  { "id": constant().ACTION_update_user_profile_detail, "name": "update_user_profile_detail" },
                  { "id": constant().ACTION_update_user_profile_detail_by_id, "name": "update_user_profile_detail_by_id" },
                  { "id": constant().ACTION_get_user_salary_info, "name": "get_user_salary_info" },
                  { "id": constant().ACTION_update_new_password, "name": "update_new_password" },
                  { "id": constant().ACTION_delete_salary, "name": "delete_salary" }
              ]
          },

          {
              "id": constant().PAGE_my_inventory,
              "name": "my_inventory",
              "actions_list": []
          },




          { "id": constant().PAGE_uploadAttendance, "name": "uploadAttendance" },
          {
              "id": constant().PAGE_view_salary,
              "name": "view_salary",
              "actions_list": [{ "id": constant().ACTION_get_all_users_detail, "name": "get_all_users_detail" }]
          },

          {
              "id": constant().PAGE_policy_documents,
              "name": "policy_documents",
              "actions_list": [{ "id": constant().ACTION_get_user_policy_document, "name": "get_user_policy_document" }]
          },




          { "id": constant().PAGE_login, "name": "login" },
          { "id": constant().PAGE_logout, "name": "logout" },
          {
              "id": constant().PAGE_manage_roles,
              "name": "manage_roles",
              "actions_list": [{ "id": constant().ACTION_delete_role, "name": "delete_role" },
                  { "id": constant().ACTION_assign_user_role, "name": "assign_user_role" },
                  { "id": constant().ACTION_list_all_roles, "name": "list_all_roles" },
                  { "id": constant().ACTION_update_role, "name": "update_role" },
                  { "id": constant().ACTION_add_roles, "name": "add_roles" }
              ]
          },



          {
              "id": constant().PAGE_manage_clients,
              "name": "manage_clients",
              "actions_list": [{ "id": constant().ACTION_get_all_clients, "name": "get_all_clients" },
                  { "id": constant().ACTION_get_client_detail, "name": "get_client_detail" },
                  { "id": constant().ACTION_create_new_client, "name": "create_new_client" },
                  { "id": constant().ACTION_update_client_details, "name": "update_client_details" },
                  { "id": constant().ACTION_create_client_invoice, "name": "create_client_invoice" },
                  { "id": constant().ACTION_delete_invoice, "name": "delete_invoice" }
              ]
          },

          {
              "id": constant().PAGE_manage_leaves,
              "name": "manage_leaves",
              "actions_list": [{ "id": constant().ACTION_get_all_leaves, "name": "get_all_leaves" },
                  { "id": constant().ACTION_change_leave_status, "name": "change_leave_status" },
                  { "id": constant().ACTION_add_extra_leave_day, "name": "add_extra_leave_day" },
                  { "id": constant().ACTION_send_request_for_doc, "name": "send_request_for_doc" },
                  { "id": constant().ACTION_add_hr_comment, "name": "add_hr_comment" }
              ]
          },

          {
              "id": constant().PAGE_mail_templates,
              "name": "mail_templates",
              "actions_list": [{ "id": constant().ACTION_update_template_variable, "name": "update_template_variable" },
                  { "id": constant().ACTION_get_email_template, "name": "get_email_template" },
                  { "id": constant().ACTION_create_email_template, "name": "create_email_template" },
                  { "id": constant().ACTION_update_email_template, "name": "update_email_template" },
                  { "id": constant().ACTION_delete_email_template, "name": "delete_email_template" },
                  { "id": constant().ACTION_get_email_template_byId, "name": "get_email_template_byId" },
                  { "id": constant().ACTION_send_employee_email, "name": "send_employee_email" },
                  { "id": constant().ACTION_create_pdf, "name": "create_pdf" }
              ]
          },

          {
              "id": constant().PAGE_add_variables,
              "name": "add_variables",
              "actions_list": [{ "id": constant().ACTION_get_template_variable, "name": "get_template_variable" },
                  { "id": constant().ACTION_create_template_variable, "name": "create_template_variable" },
                  { "id": constant().ACTION_delete_template_variable, "name": "delete_template_variable" }
              ]
          },

          {
              "id": constant().PAGE_upload_policy_documents,
              "name": "upload_policy_documents",
              "actions_list": [{ "id": constant().ACTION_save_policy_document, "name": "save_policy_document" },
                  { "id": constant().ACTION_get_policy_document, "name": "get_policy_document" },
                  { "id": constant().ACTION_update_user_policy_document, "name": "update_user_policy_document" }
              ]
          },

          {
              "id": constant().PAGE_manage_users,
              "name": "manage_users",
              "actions_list": [{ "id": constant().ACTION_get_enable_user, "name": "get_enable_user" },
                  { "id": constant().ACTION_get_user_profile_detail_by_id, "name": "get_user_profile_detail_by_id" },
                  { "id": constant().ACTION_get_user_document_by_id, "name": "get_user_document_by_id" },
                  { "id": constant().ACTION_add_new_employee, "name": "add_new_employee" },
                  { "id": constant().ACTION_delete_user_document, "name": "delete_user_document" },
                  { "id": constant().ACTION_get_employee_life_cycle, "name": "get_employee_life_cycle" },
                  { "id": constant().ACTION_update_employee_life_cycle, "name": "update_employee_life_cycle" }
              ]
          },

          {
              "id": constant().PAGE_manage_user_pending_hours,
              "name": "manage_user_pending_hours",
              "actions_list": [{ "id": constant().ACTION_admin_user_apply_leave, "name": "admin_user_apply_leave" },
                  { "id": constant().ACTION_get_all_user_previous_month_time, "name": "get_all_user_previous_month_time" }
              ]
          },

          {
              "id": constant().PAGE_manage_payslips,
              "name": "manage_payslips",
              "actions_list": [{ "id": constant().ACTION_create_employee_salary_slip, "name": "create_employee_salary_slip" },
                  { "id": constant().ACTION_send_payslips_to_employees, "name": "send_payslips_to_employees" },
                  { "id": constant().ACTION_get_user_manage_payslips_data, "name": "get_user_manage_payslips_data" },
                  { "id": constant().ACTION_save_google_payslip_drive_access_token, "name": "save_google_payslip_drive_access_token" },
                  { "id": constant().ACTION_get_user_salary_info_by_id, "name": "get_user_salary_info_by_id" }
              ]
          },
          {
              "id": constant().PAGE_documents,
              "name": "documents",
              "actions_list": [{ "id": constant().ACTION_get_user_document, "name": "get_user_document" }]
          },
          {
              "id": constant().PAGE_manage_user_working_hours,
              "name": "manage_user_working_hours",
              "actions_list": [{ "id": constant().ACTION_add_user_working_hours, "name": "add_user_working_hours" },
                  { "id": constant().ACTION_get_managed_user_working_hours, "name": "get_managed_user_working_hours" }
              ]
          },

      ];

      return array;
  }