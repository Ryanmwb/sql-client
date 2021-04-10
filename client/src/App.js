import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import store from "./state/store";
import emotionTheme from "./styles/emotion-theme";

function App() {
  return (
    <Provider store={store}>
      <EmotionThemeProvider theme={emotionTheme}>
        <Router>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </EmotionThemeProvider>
    </Provider>
  );
}

export default App;
