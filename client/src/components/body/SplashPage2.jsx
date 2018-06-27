import React, { Component } from 'react';
import NavBar from '..//header/NavBar.jsx';
import { Menu, Segment } from 'semantic-ui-react';
import ContactInfo from '../footer/ContactInfo.jsx';
import AOS from 'aos';
import $ from 'jquery';

export default class SplashPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <NavBar setUser={this.props.setUser} username={this.props.username} />

        
      </div>

    )
  }
}