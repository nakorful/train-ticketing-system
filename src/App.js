import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from './app/redux/configureStore';
import { PersistGate } from 'redux-persist/lib/integration/react';
import "./app/assets/vendor/bootstrap.min.css";
import './app/assets/fonts/font.css';

import { nonAuthRoutes, authRoutes } from "./app/routes";
import AuthRoute from './app/components/AuthRoute';
import Home from "./app/pages/Home";


const {store, persistor} = configureStore();


const App = () => (
    <Provider store={store}>
        <PersistGate loading={<div >Loading</div>} persistor={persistor}>
            <Router>
                <Switch>
                    <Route path={"/"} exact component={Home} />
                    {/* ::::: Does not require authentication ::::: */}
                    {
                        nonAuthRoutes.map((route, index) => {
                            const exact = route.exact === undefined || route.exact;
                            return <Route key={index} {...route} exact={exact} />;
                        })
                    }

                    {/* ::::: Requires authentication ::::: */}
                    {
                        authRoutes.map((route, index) => {
                            const exact = route.exact === undefined || route.exact;
                            return <AuthRoute key={index} component={route.component} path={route.path} exact={exact} />;
                        })
                    }
                </Switch>
            </Router>
        </PersistGate>
    </Provider>
);


export default App;
