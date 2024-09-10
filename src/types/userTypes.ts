import { IFileAfterUpload, I_STATUS, I_YN } from "./globalType";

/* export type IUserGeneralData = {
  status: string;
  name: {
    firstName: string;
    lastName: string;
    middleName?: string; // Optional middle name
  };
  gender: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  address: string;
  img: string;
};

export type IStudentCreate = {
  password?: string;
  student: IUserGeneralData;
};
export type ISellerCreate = {
  password?: string;
  seller: IUserGeneralData;
};
export type ITrainerCreate = {
  password?: string;
  trainer: IUserGeneralData;
};
export type IAdminCreate = {
  password?: string;
  admin: IUserGeneralData;
};

 */
export type IGender = "male" | "female" | "other";
export enum ENUM_USER_ROLE {
  admin = "admin",
  superAdmin = "superAdmin",
  buyer = "buyer",
  seller = "seller",
}
export type I_USER_ROLE = "admin" | "superAdmin" | "buyer" | "seller";
export type IUser = {
  _id: string;
  userUniqueId: string;
  name: { firstName: string; lastName: string };
  email: string;
  role: I_USER_ROLE;
  password: string;
  dateOfBirth?: string;
  gender?: IGender;
  phoneNumber?: string;
  profileImage?: IFileAfterUpload;
  address?: string;
  isFirstLogin?: I_YN;
  tempUser: {
    tempUserId: string;
    otp: string;
  };
  location?: {
    link?: string;
    latitude?: number;
    longitude?: number;
    coordinates: number[]; // first -> longitude,latitude
    type: string | "Point";
  };
  authentication?: {
    otp: number;
    jwtToken?: string;
    timeOut: string;
    status: I_STATUS;
  };
  stripeAccount?: {
    accountNo: string;
    refId?: string;
    refDetails?: Record<string, any>;
  };
  status: I_STATUS;
  isDelete: I_YN;
};
