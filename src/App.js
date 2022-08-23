import Home from "./components/Home";
import { Router, BrowserRouter, Switch, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
