import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Movies from "./pages/Movies";

function App() {
  const theme = createMuiTheme({
    palette: {
      type: "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/movie/add">
              <AddMovie />
            </Route>
            <Route path="/movie/edit">
              <EditMovie />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
