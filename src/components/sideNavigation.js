import React, {Component} from 'react';
import logo from "../images/logo.png";
import './register.css'
import { MDBListGroup, MDBNavbarToggler, MDBCollapse, MDBNavLink, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class SideNavigation extends Component {

    constructor(props) {
        super(props);
        // this.deconnection = this.deconnection.bind(this)
        // this.renderRedirect = this.renderRedirect.bind(this)
    }
    state = {
        collapse: true
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
        <div className="sidebar-fixed position-fixed">
            <a href="#!" className="logo-wrapper waves-effect">
                <img alt="ExtraCook" className="img-fluid" src={logo} />
            </a>
            <MDBNavbarToggler onClick={this.onClick} />
                <MDBCollapse isOpen={this.state.collapse} navbar>
            <MDBListGroup className="list-group-flush" id="lien-dasboard-total">
                <NavLink id="lien-dasboard" exact={true} to="/admin/upload">
                    <MDBListGroupItem  id='MDBListGroup'>
                        <MDBIcon icon="download" className="mr-3" />
                        Ajouter Article
                    </MDBListGroupItem>
                </NavLink>

                <NavLink id="lien-dasboard" to="/admin/article" >
                    <MDBListGroupItem  id='MDBListGroup'>
                        <MDBIcon icon="clipboard-list" className="mr-3" />
                        Liste des Articles
                    </MDBListGroupItem>
                </NavLink>

                <NavLink id="lien-dasboard" to="/" >
                    <MDBListGroupItem  id='MDBListGroup'>
                        <MDBIcon icon="home" className="mr-3" />
                        Accueil ExtraComm
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
            </MDBCollapse>
        </div>
    );
}
}

const mapStateToProps = (state) => {
    return {
                    client: state
        }
    }
export default connect(mapStateToProps)(SideNavigation);