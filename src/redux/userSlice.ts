import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../components/Signup";
// import type { RootState } from "./store";

interface signupUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  address: {
    street: string;
    city: string;
    zipcode: number;
  };
  contact: number;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  dob: string;
}

interface UserState {
  userList: User[];
  selectedUser: User;
  isLoggedIn: boolean;
  signupUser: signupUser;
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
    dob: "",
  },
  isLoggedIn: false,
  signupUser: {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    address: {
      street: "",
      city: "",
      zipcode: 0,
    },
    contact: 9999999999,
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
    dob: "",
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
    setLoggedInState: (state) => {
      state.isLoggedIn = !initialState.isLoggedIn;
    },
    resetLoggedInState: (state) => {
      state.isLoggedIn = initialState.isLoggedIn;
    },
    setSignupUser: (state, action: PayloadAction<signupUser>) => {
      state.signupUser = action.payload;
    },
    resetSignupUser: (state) => {
      state.signupUser = initialState.signupUser;
    },
  },
});

export const { addUserList, setUserDetails, resetSelectedUser, setLoggedInState, resetLoggedInState, setSignupUser, resetSignupUser } =
  userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
