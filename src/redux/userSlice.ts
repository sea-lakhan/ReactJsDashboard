import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../components/Signup";
import type { RootState } from "./store";

interface UserState {
  userList: User[];
  selectedUser: User;
}

// Define the initial state using that type
export const initialState: UserState = {
  userList: [],
  selectedUser: {
    name: "",
    username: "",
    email: "",
    password: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: 0,
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  },
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addUserList: (state, action: PayloadAction<User[]>) => {
      state.userList = action.payload;
    },
    setUserDetails: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
    resetSelectedUser: (state) => {
      state.selectedUser = initialState.selectedUser;
    },
  },
});

export const { addUserList, setUserDetails, resetSelectedUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
