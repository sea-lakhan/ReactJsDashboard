import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface UserState {
  name: string;
  email: string;
  username: string;
  password: string;
}

// Define the initial state using that type
export const initialState = {
  userList: [],
  selectedUser: {},
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addUserList: (state, action: PayloadAction<any>) => {
      state.userList = action.payload;
    },
    setUserDetails: (state, action: PayloadAction<any>) => {
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
