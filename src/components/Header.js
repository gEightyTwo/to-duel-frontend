import React from 'react';

import { Jumbotron, Container, Row, Col, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogout } from '../actions/auth';
import banner from '../assets/jakub-kriz-414659-unsplash.jpg'
import bigLogo from '../assets/fencing-duel(2).png' //from flaticon.com called fencing duel free icon

class Header extends React.Component {
  render () {
    return (
      <div>
        <Jumbotron style={{backgroundImage:"url("+banner+")"}}>
          <Container>
            <Row>
              <Col md="3">
                <img className="logo" src={bigLogo} />
              <h1 className="title">To Duel</h1>
              </Col>
              <Col md="9">
              </Col>
            </Row>
          {/* <img class="banner" src={banner} alt="To Duel" /> */}
        </Container>
        </Jumbotron>

        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">
            USER_ID
          </NavbarBrand>
          {
            this.props.authorized ? (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink className="nav-link" disabled> &bull; </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/snacks" className="nav-link">Snacks</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/" className="nav-link" onClick={() => this.props.userLogout()}>Log Out</NavLink>
                </NavItem>
              </Nav>
            ) : (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/login" className="nav-link">Log In</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/signup" className="nav-link">Sign Up</NavLink>
                </NavItem>
              </Nav>
            )
          }
        </Navbar>
      </div>
    );
  };
};

const mapStateToProps = state => ({
  // user: state.auth.user,
  // authorized: state.auth.authorized
});

const mapDispatchToProps = dispatch => bindActionCreators({ userLogout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
