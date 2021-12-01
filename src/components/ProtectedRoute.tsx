import React, { Children, Component } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, useHistory } from "react-router";
import { RootState } from "../redux/store";
import { User } from "./Signup";

type routeProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ component, ...rest }: any) => {
  const isLoggedIn = useSelector<RootState, { userList: User[]; selectedUser: User }>((state: any) => state.user.isLoggedIn);
  const navigation = useHistory();
  return (
    <Route
      {...rest}
      render={(props: any) => {
        if (isLoggedIn) {
          //   return <Component {...props} />;
          return React.createElement(component, props);
        } else {
          navigation.replace("/");
          //   <Redirect to={{ pathname: "/" }} />;
        }
      }}
    />
  );
};
