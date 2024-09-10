import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
export type IImagePlatform = "imgbb" | "cloudinary" | "server" | "aws" | string;
export type IFileAfterUpload = {
  mimetype: string;
  server_url?: string;
  filename?: string;
  path?: string;
  url?: string;
  durl?: string;
  platform: IImagePlatform;
  cdn?: string; //https://www.youtube.com/watch?v=kbI7kRWAU-w
  // fileId: Types.ObjectId | string | IFileUploade;
};
export type TUser = {
  userId: string;
  roleBaseUserId: string;
  role: string;
  iat: number;
  exp: number;
};
export type TuserData = {
  userUniqueId: string;
  // fullName: string;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  contactNumber: string;
  gender: string;
  dateOfBirth?: string;
  address?: string;
  profileImage?: IFileAfterUpload;
};

type TAuthState = {
  user: null | TUser;
  userData: null | TuserData;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, userData, token } = action.payload;
      state.user = user;
      state.userData = userData;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userData = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
