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
      <div id="splash-page">
        <NavBar setUser={this.props.setUser} username={this.props.username} />
        <img className="splash-image" src="splashtextjpg.jpg" />
        
        <div className="how-it-works">
          <h1 className="how-title jsas">How It Works</h1>

            <div className="how-row1 grid">
            <img src="invite.png" className="how-it-works-img how-pic1" 
                data-aos="flip-right"
                data-aos-duration="1000" 
                data-aos-delay="100"
                data-aos-once="false"
            />
            <p className="how-description">
                Thinking about going somewhere?
                <br />
                Invite your friends and start planning together!
            </p>
            </div>

            <div className="how-row2 grid" id="how-it-works">
              <p className="how-description how-words2">
                Discuss each topic on its own message board.
                <br />
                No more getting lost in the conversation!
            </p>
              <img src="discuss.png" className="how-it-works-img how-pic2" 
                data-aos="flip-left"
                data-aos-duration="1000" 
                data-aos-delay="100"
                data-aos-once="false"
              />
            </div>


        </div>

      </div>

    )
  }
}