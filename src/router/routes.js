import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Layouts from "../components/layout/Layout";
import ProtectedRoute from "../utils/protected.route"
import { readCookie } from "../utils/readCookie";

function Routes(props) {
    // let token = readCookie('token');
    const [token, setToken] = useState(readCookie('token'))
    useEffect(() => {
        setToken(readCookie('token'))
    }, [readCookie('token')])
    return (
        <Router>
            <Route
                exact
                path="/signup"
                render={() => {
                    if (token) return <Redirect to="dashboard" />
                    else return <Route exact path="/signup" component={SignUp} />
                }}
            />
            <Route
                exact
                path="/login"
                render={() => {
                    if (token) return <Redirect to="dashboard" />
                    else return <Route exact path="/login" component={Login} />
                }}
            />

            <ProtectedRoute component={token && Layouts} />
        </Router>
    );
}

export default Routes;
