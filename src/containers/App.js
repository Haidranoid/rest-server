import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from "./home/Home";
import Products from "./products/Products";

const App = () => (
    <Router>
        <Switch>
            <Route exact path="/products" component={Products}/>
            <Route exact path="/" component={Home}/>

            <Route render={() => <div>Not Found</div>}/>
        </Switch>
    </Router>
);

export default App
