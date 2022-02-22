import React from 'react';
import Content from './component/Table';
import Home from './component/Home';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, withRouter, browserHistory, Switch, Route, Link, Redirect, useHistory, useLocation } from "react-router-dom";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedInStatus:"", users: "check", handleLoggin: null }
    //localStorage.setItem('Logged_In',"Loggged_In");

  }

  render() {
    const handleLoggin = localStorage.getItem('Logged_In');
    console.log(handleLoggin+'sfdsfdf');
    console.log(handleLoggin);
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} render={
            props => ( (handleLoggin == 'Loggged_In') ? <Redirect to="/table" /> :
              <Home {...props} loggedInStatus={this.state.loggedInStatus} />
            )
          } />
          <Route exact path="/table" component={Content} />
          <Route exact path="/app" component={App} />
        
        </Switch>
      </BrowserRouter>

    );
  }
}







export default App;