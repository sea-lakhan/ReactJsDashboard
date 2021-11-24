import "./App.css";
import { Switch, Route } from "react-router-dom";
import { UserDashboard } from "./components/UserDashboard";
import { UserDetails } from "./components/UserDetails";
import { Signup } from "./components/Signup";
import { Details } from "./components/Details";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

import { theme } from "./theme/Theme";
import { ThemeProvider } from "@material-ui/styles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" render={() => <UserDashboard />} />
          <Route exact path="/addUser" render={() => <Signup />} />
          <Route exact path="/confirmDetails" render={() => <Details />} />
          <Route exact path="/userDetails" render={() => <UserDetails />} />
        </Switch>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
