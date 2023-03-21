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
  bankAccount: {
    name: string;
    number: string;
    sortCode: string;
  };
  company: {
    name: string;
    address: string;
  };
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  matricNumber: string;
  email: string;
  password: string;
  isProfileComplete: boolean;
  __v: any;
  phone: string;
  attachmentPeriod: string;
  courseOfStudy: string;
  yearOfStudy: string;
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
