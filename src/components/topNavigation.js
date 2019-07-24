import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import './register.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class TopNavigation extends Component {

    constructor(props) {
        super(props);
        this.deconnection = this.deconnection.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
    }
    state = {
        collapse: true
    }

    renderRedirect = () => {
        if (localStorage.getItem('login') == 'false') {
            return <Redirect to='/login' />
        } else {
            console.log('test');
        }
    }

    deconnection(e) {
        console.log('local deconnection: ', localStorage.getItem('login'));
        const action = { type: "DECONNECT", value: e }
        this.props.dispatch(action)
    }

    onClick = () => {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <MDBNavbar id="MDBNavbar" className="flexible-navbar position-fixed" light expand="md" scrolling>
                <MDBNavbarBrand>
                    {this.renderRedirect()}
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.onClick} />
                <MDBCollapse isOpen={this.state.collapse} navbar>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <strong className="nav-link navbar-link nom-user">Bonjour {localStorage.getItem('user')}</strong>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem onClick={() => { this.deconnection() }}>
                            <MDBNavLink rel="noopener noreferrer" className="nav-link Ripple-parent" href="/login">Deconnexion</MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        client: state
    }
}
export default connect(mapStateToProps)(TopNavigation);