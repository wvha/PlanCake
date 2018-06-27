import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import SplashPage from './components/body/SplashPage.jsx';
import NavBar from './components/header/NavBar.jsx';
import ContactInfo from './components/footer/ContactInfo.jsx';
import LoggedInView from './components/body/LoggedInView.jsx';
import EventSummary from './components/body/EventSummary.jsx';
import SplashPage2 from './components/body/SplashPage2.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData:
        {
          id: null,
          firstName: null,
          lastName: null,
          email: null,
          username: null,
          createdAt: null,
          updatedAt: null
        }
    }

    this.setUser = this.setUser.bind(this);
  }

  setUser(obj) {
    this.setState({userData: obj});
  }

  render() {
    return (
        <Switch>

          <Route 
            exact path="/" 
            render={() => 
            <SplashPage2 
            setUser={this.setUser}
            username={this.state.userData.username}
            />}
          />

          <Route 
            exact path="/loggedinview" 
            render={() => 
            <LoggedInView  
            userData={ this.state.userData }
            />} 
          />

        </Switch>
    )
  }
};
