enum Endpoints {
  AdminLogin = "/admin/login",
  ValidateAdminToken = "/admin/token/validate",
  GetAdminProfile = "/admin/profile",
  UpdateAdminEmail = "/admin/profile/email",
  ValidateAdminPassword = "/admin/password/validate",
  UpdateAdminPassword = "/admin/password/update",
  GetStudents = "/admin/students",
  GetSingleStudent = "/student/profile/",
  GenerateStudentToken = "/admin/student/token/generate",
  GenerateSupervisorKey = "/admin/supervisor/key/generate",
  GetSupervisorProfiles = "/admin/supervisors",
  GetSingleSupervisor = "/supervisor/profile/",
  GetSupervisorStudents = "/supervisor/students",
  AssignStudentToSupervisor = "/admin/supervisor/student/assign",
  UnassignStudentToSupervisor = "/admin/supervisor/student/remove",
  SendStudentNotification = "/admin/student/notification/send",
}
export { Endpoints };
