import "./App.css";
import { Switch, Route } from "react-router-dom";
import { UserDashboard } from "./components/UserDashboard";
import { UserDetails } from "./components/UserDetails";
import { SignupNew } from "./components/SignupNew";
import { Details } from "./components/Details";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

import { theme } from "./theme/Theme";
import { ThemeProvider } from "@material-ui/styles";
import { Login } from "./components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Dashboard } from "./components/Dashboard";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        {/* <Route exact path="/" render={() => <Login />} /> */}
        <Switch>
          <Route exact path="/" render={() => <SignupNew />} />
          <Route exact path="/dashboard" render={() => <Dashboard />} />
        </Switch>
        {/* <Switch> */}
        {/* <ProtectedRoute exact path="/dashboard" component={UserDashboard} /> */}
        {/* <Route exact path="/dashboard" render={() => <UserDashboard />} /> */}
        {/* <Route exact path="/addUser" render={() => <Signup />} /> */}
        {/* <ProtectedRoute exact path="/dashboard" component={UserDashboard} /> */}
        {/* <Route exact path="/confirmDetails" render={() => <Details />} /> */}
        {/* <ProtectedRoute exact path="/confirmDetails" component={() => <Details />} /> */}
        {/* <Route exact path="/userDetails" render={() => <UserDetails />} /> */}
        {/* <ProtectedRoute exact path="/userDetails" component={() => <UserDetails />} /> */}
        {/* </Switch> */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
