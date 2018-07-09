import React, { Component } from 'react';
import Login from './Login.jsx';
import Signup from './SignUp.jsx';
import axios from 'axios';
import Logout from './Logout.jsx';
import Inbox from './Inbox.jsx';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { HashLink } from 'react-router-hash-link';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      dropdownIsOpen: false,
      navView: 'login',
      error: ''
    }

    this.handleModal = this.handleModal.bind(this);
    this.handleView = this.handleView.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
  }

  handleDropdown() {
    console.log('click!');
    // document.getElementsByClassName("nav-dropdown-links");
    this.setState({
      dropdownIsOpen: !this.state.dropdownIsOpen
    });
  }

  handleError(errorMsg) {
    this.setState({ error: errorMsg })
  }

  handleModal() {
    if (!this.state.modalIsOpen) {
      this.handleView('login')
    }
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
      error: ''
    })
  }

  handleView(view) {
    this.setState({ navView: view })
  }

  sendLogin(credentials) {
    return axios.post('/api/login', credentials)
  }

  logout() {
    Promise.resolve(this.props.removeActiveUser())
      .then(() => {
        return axios.get('/api/logout')
      })
      .then(() => {
        this.setState({
          status: 'not authenticated',
        })
      })
  }

  render() {
    return (
      <div className="outer-div" id="nav-bar">
        <div className="header-navbar grid">
          <a href="/">
            <img className="logo jsas" src="plancakelogo.png" />
          </a>
            {
              this.props.username !== null
                ? 
                <div className="nav-links-loggedIn">
                <div className="nav-collapse">
                  <Inbox 
                    invites={this.props.invites} 
                    acceptInvite={this.props.acceptInvite}
                    ignoreInvite={this.props.ignoreInvite}
                  />
                </div>
                <div className="nav-collapse">
                  <Link to='/loggedInView' className="header-icon">
                    <Icon 
                      name='calendar' 
                      onClick={this.props.handleHomeReloadItineraries}
                    />
                  </Link>
                </div>
                <div className="nav-collapse">
                  <h3 className="nav-name">{this.props.userData.firstName}</h3>
                </div>
                <div className="nav-collapse">
                  <Logout logout={this.logout} className="nav-name"/>
                </div> 

              <div>
              <Icon name='bars' id='nav-dropdown-bars' className="header-icon" onClick={() => this.handleDropdown()} />
                <div className="nav-dropdown-links">
                  <Link to='/loggedInView' className="header-icon">
                    <Icon 
                      name='calendar' 
                      onClick={this.props.handleHomeReloadItineraries}
                    />
                  </Link>
                </div>
              </div>
              </div>
              : 
                <div className="nav-links">
                <HashLink smooth to="/#how-it-works" className="hashlink nav-collapse"><h3>How It Works</h3></HashLink>
                <HashLink smooth to="/#about-us" className="hashlink nav-collapse"><h3>About Us</h3></HashLink>
                <h3 className="nav-collapse" onClick={this.handleModal.bind(this)}>Login</h3>
              
                <Icon name='bars' id='nav-dropdown-bars' className="header-icon" onClick={() => this.handleDropdown()} />
                  <div className="nav-dropdown-links">
                    <HashLink smooth to="/#how-it-works" className="hashlink nav-collapse"><h4>How It Works</h4></HashLink>
                    <HashLink smooth to="/#about-us" className="hashlink nav-collapse"><h4>About Us</h4></HashLink>
                    <h4 className="nav-collapse" onClick={this.handleModal.bind(this)}>Login</h4>
                  </div>
              </div>
          }
          {
            this.state.navView === 'login'
              ? <Login
                handleModal={this.handleModal}
                sendLogin={this.sendLogin}
                setUser={this.props.setUser}
                handleView={this.handleView}
                modalIsOpen={this.state.modalIsOpen}
                error={this.state.error}
                handleError={this.handleError}
              />
              : <Signup
                handleModal={this.handleModal}
                sendLogin={this.sendLogin}
                setUser={this.props.setUser}
                modalIsOpen={this.state.modalIsOpen}
                error={this.state.error}
                handleError={this.handleError}
                handleView={this.handleView}
              />
          }
        </div>
    </div>
    )
  }
}