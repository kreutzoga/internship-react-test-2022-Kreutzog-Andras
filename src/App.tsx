import React, { Component } from "react";
import Navbar from "./components/navbar/Navbar";
import { Switch, Route, Redirect } from "react-router";
import Sandbox from "./pages/Sandbox/Sandbox";
import Movies from "./pages/Movies/Movies";

class App extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Switch>
                    <Route path="/sandbox" component={Sandbox} />
                    <Route path="/movies" component={Movies} />
                    <Redirect to="/movies" />
                </Switch>
            </div>
        );
    }
}

export default App;