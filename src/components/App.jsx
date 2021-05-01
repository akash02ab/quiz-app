import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Quiz from './Quiz';
import Result from './Result';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/result">
                    <Result />
                </Route>
                
                <Route path="/404">
                    <h1>Page Not Found</h1>
                </Route>
                
                <Route exact path="/">
                    <Quiz />
                </Route>

                <Redirect to="/404"/>
            </Switch>
        </Router>
    );
}

export default App;