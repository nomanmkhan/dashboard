import React from 'react'
import {
  Route,
  Switch,
} from "react-router-dom";
import Dashboard from '../../../pages/Dashboard';
const RouteApp = () => {
  return (
    <Switch>
      <Route path={`/dashboard`} component={Dashboard} />
    </Switch>
  )
}

export default RouteApp;