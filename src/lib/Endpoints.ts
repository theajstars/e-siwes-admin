enum Endpoints {
  AdminLogin = "/admin/login",
  ValidateAdminToken = "/admin/token/validate",
  GetAdminProfile = "/admin/profile",
  UpdateAdminEmail = "/admin/profile/email",
  ValidateAdminPassword = "/admin/password/validate",
  UpdateAdminPassword = "/admin/password/update",
  GetStudents = "/admin/students",
  GenerateStudentToken = "/admin/student/token/generate",
  GenerateSupervisorKey = "/admin/supervisor/key/generate",
  GetSupervisorProfiles = "/admin/supervisors",
  GetSingleSupervisor = "/supervisor/profile/",
}
export { Endpoints };
