import { createSlice } from "@reduxjs/toolkit";
import { userType } from "../Types";

export const userStorageName = "superhero_user";

export const defaultUser: userType = {
  id: "",
  username: "",
  email: "",
  isOnline: false,
  img: "",
  creationTime: "",
  lastSeen: "",
  bio: "",
};
type userStateType = {
  users: userType[];
  currentUser: userType;
  alertProps: {
    open: boolean;
    receiverId: string;
    receiverName: string;
  };
};

const initialState: userStateType = {
  users: [],
  currentUser: defaultUser,
  alertProps: {
    open: false,
    receiverId: "",
    receiverName: "",
  },
  // currentSelectedUser:null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;

      // store user in local storage
      localStorage.setItem(userStorageName, JSON.stringify(user));

      // set loged in user
      state.currentUser = user;
    },
    setUsers: (state, action) => {
      // set all users
      state.users = action.payload;
    },
    setAlertProps: (state, action) => {
      const { open, recieverId: receiverId, recieverName } = action.payload;

      state.alertProps = {
        open,
        receiverId: receiverId || "",
        receiverName: recieverName || "",
      };
    },
  },
});

export const { setUser, setUsers, setAlertProps } = userSlice.actions;

export default userSlice.reducer;