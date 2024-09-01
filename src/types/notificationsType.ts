import { IFileAfterUpload, I_STATUS, I_YN } from "./globalType";
import { I_USER_ROLE } from "./userTypes";

export type INotification = {
    // toObject(): unknown;
    _id:string;
    userIds?: Array< string >;
    role?: I_USER_ROLE;
    subject?: string;
    image?: IFileAfterUpload;
    bodyText: string;
    isSeen?: I_YN;
    status?: I_STATUS;
    isDelete?: I_YN;
    createdAt:string;
  };