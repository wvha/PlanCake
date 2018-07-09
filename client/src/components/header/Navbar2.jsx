import React, { Component } from 'react';
import Login from './Login.jsx';
import Signup from './SignUp.jsx';
import axios from 'axios';
import Logout from './Logout.jsx';
import Inbox from './Inbox.jsx';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';
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

    if (this.props.username) {
      return (
        <Menu stackable inverted className="navbar2 header-navbar" size="small">
          <Menu.Item>
            <a href="/">
              <img className="logo jsas" src="plancakelogo.png" />
            </a>
          </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            <Inbox 
              invites={this.props.invites} 
              acceptInvite={this.props.acceptInvite}
              ignoreInvite={this.props.ignoreInvite}
            />
          </Menu.Item>

          <Menu.Item>
            <Link to='/loggedInView' className="header-icon">
              <Icon 
                name='calendar' 
                onClick={this.props.handleHomeReloadItineraries}
              />
            </Link>
          </Menu.Item>
        
          <Menu.Item>
            <h3 className="nav-name">{this.props.userData.firstName}</h3>
          </Menu.Item>

          <Menu.Item>
            <Logout logout={this.logout} className="nav-name"/>
          </Menu.Item>
          </Menu.Menu>
        </Menu>
      )
    } else {
      return (
        <div>
        <Menu stackable inverted className="navbar2 header-navbar" size="small">
          {/* <Menu.Item> */}
            <a href="/">
              <img className="logo jsas" src="plancakelogo.png" />
            </a>
          {/* </Menu.Item> */}

          <Menu.Menu position="right">
          <Menu.Item>
            <HashLink smooth to="/#how-it-works" className="hashlink nav-collapse"><h3>How It Works</h3></HashLink>
          </Menu.Item>

          <Menu.Item>
            <HashLink smooth to="/#about-us" className="hashlink nav-collapse"><h3>About Us</h3></HashLink>
          </Menu.Item>

          <Menu.Item>
            <h3 onClick={this.handleModal.bind(this)}>Login</h3>
          </Menu.Item>

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
          </Menu.Menu>
        </Menu>
        </div>
      )
    }
  }
}
