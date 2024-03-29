import {
  AxiosResponse,
  RawAxiosResponseHeaders,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
} from "axios";

export interface DefaultResponse<T = any, D = any> {
  data: {
    auth: boolean;
    message: string;
    data: any;
  };
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: InternalAxiosRequestConfig<D>;
  request?: any;
}
export interface LoginResponse extends Omit<DefaultResponse, "data"> {
  data: {
    auth: boolean;
    data: string;
    message?: string;
  };
}
export interface ValidateAdminResponse extends Omit<DefaultResponse, "data"> {
  data: {
    auth: boolean;
    data?: Supervisor[] | [];
    message?: string;
  };
}

export interface Student {
  _id: string;

  __v: any;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  college?: string;
  password: string;
  phone: string;
  matricNumber: string;
  supervisor: string;
  bankAccount: {
    name: string;
    number: string;
    sortCode: string;
    masterListNumber: string;
  };
  yearOfStudy: string;
  courseOfStudy: string;
  attachmentPeriod: string;
  company: {
    name: string;
    address: string;
  };
  isProfileComplete: boolean;
  isAuthenticated: boolean;
  hasPaid: boolean;
}

export interface Admin {
  email: string;
  id: string;
  password: string;
  _id: string;
  message?: string;
}
export interface Year {
  _id: string;
  id: string;
  year: string;
  current: boolean;
}

export interface StudentResponse extends Omit<DefaultResponse, "data"> {
  data: {
    auth: boolean;
    data: Student[] | [];
    message?: string;
  };
}

export interface Supervisor {
  email: string;
  firstName: string;
  id: string;
  isProfileComplete: boolean;
  lastName: string;
  password: string;
  phone: string;
  students:
    | [
        {
          studentID: string;
        }
      ]
    | [];
}

export interface SupervisorResponse extends Omit<DefaultResponse, "data"> {
  data: {
    auth: boolean;
    data: Supervisor[] | [];
    message?: string;
  };
}

export interface SingleSupervisorResponse
  extends Omit<DefaultResponse, "data"> {
  data: {
    auth: boolean;
    data?: Supervisor;
    message: string;
  };
}
export interface SingleStudentResponse extends Omit<DefaultResponse, "data"> {
  data: {
    auth: boolean;
    data?: Student;
    message: string;
  };
}
export interface AdminResponse extends Omit<DefaultResponse, "data"> {
  data: {
    auth: boolean;
    data: Admin;
  };
}
export interface YearResponse extends Omit<DefaultResponse, "data"> {
  data: {
    auth: boolean;
    data: { year: Year; students: Student[] };
  };
}
export interface ArchiveResponse extends Omit<DefaultResponse, "data"> {
  data: {
    auth: boolean;
    data: Year[];
  };
}
export interface ValidatePasswordResponse
  extends Omit<DefaultResponse, "data"> {
  data: {
    auth: boolean;
    message?: string;
  };
}
