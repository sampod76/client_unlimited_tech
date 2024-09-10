import { IUser } from "./userTypes";

// TypeScript type
type OsType = {
  name: string;
  short_name: string;
  version: string;
  platform: string;
  family: string;
};

type ClientType = {
  type: string;
  name: string;
  short_name: string;
  version: string;
  engine: string;
  engine_version: string;
  family: string;
};

type DeviceType = {
  id: string;
  type: string;
  brand: string;
  model: string;
  code: string;
};

type Idevice_info = {
  os: OsType;
  client: ClientType;
  device: DeviceType;
};

export type IUserLoginHistory = {
  userId: string;
  userData?: IUser;
  user_agent: string;
  ip: string;
  time: string;
  token: string;
  device_info: Idevice_info;
  status: string;
  isDelete: string;
};
