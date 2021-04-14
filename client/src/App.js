import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import Home from "./pages/home";
import Query from "./pages/query";
import configureStore from "./state/store";
import emotionTheme from "./styles/emotion-theme";

function App() {
  const { store, persistor } = configureStore();
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <EmotionThemeProvider theme={emotionTheme}>
          <ToastContainer />
          <Router>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/query">
                <Query />
              </Route>
            </Switch>
          </Router>
        </EmotionThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
