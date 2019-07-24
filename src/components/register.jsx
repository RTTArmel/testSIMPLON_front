import React from 'react';
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask } from "mdbreact";
import { MDBBtn, MDBInput, MDBNavLink, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import './register.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nom: '', prenom: '', specialite: '', email: '', password: '', pwd: '' }
        this.handleChange = this.handleChange.bind(this)
        this.enregistrement = this.enregistrement.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
    }

    renderRedirect = () => {
        if (localStorage.getItem('login') == 'true') {
            return <Redirect to='/admin' />
        } else {
            console.log('test');
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    enregistrement(e) {
        const action = { type: "REGISTER", value: e }
        this.props.dispatch(action)
    }

    render() {
        return (
            <div id="totalregister">
                {this.renderRedirect()}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-7">
                            <MDBCarousel id="slide"
                                activeItem={1}
                                length={4}
                                showControls={true}
                                showIndicators={true}
                                className="z-depth-1"
                            >
                                <MDBCarouselInner>
                                    <MDBCarouselItem id='slid' itemId="1">
                                        <MDBView>

                                            <img id='slid1'
                                                className="d-block w-100"
                                                src="../images/ecommerce1.png"
                                                alt="First slide"
                                            />

                                            <MDBMask overlay="black-light" />
                                        </MDBView>
                                        <MDBCarouselCaption>
                                            <h3 className="h3-responsive " id="h3slide">Light mask</h3>
                                            <p>First text</p>
                                        </MDBCarouselCaption>
                                    </MDBCarouselItem>
                                    <MDBCarouselItem id='slid' itemId="2">
                                        <MDBView>
                                            <img id='slid1'
                                                className="d-block w-100"
                                                src="../images/ecommerce2.png"
                                                alt="Second slide"
                                            />
                                            <MDBMask overlay="black-strong" />
                                        </MDBView>
                                        <MDBCarouselCaption>
                                            <h3 className="h3-responsive" id="h3slide">Strong mask</h3>
                                            <p>Second text</p>
                                        </MDBCarouselCaption>
                                    </MDBCarouselItem>
                                    <MDBCarouselItem id='slid' itemId="3">
                                        <MDBView>
                                            <img id='slid1'
                                                className="d-block w-100"
                                                src="../images/ecommerce3.png"
                                                alt="Third slide"
                                            />
                                            <MDBMask overlay="black-slight" />
                                        </MDBView>
                                        <MDBCarouselCaption>
                                            <h3 className="h3-responsive" id="h3slide">Slight mask</h3>
                                            <p>Third text</p>
                                        </MDBCarouselCaption>
                                    </MDBCarouselItem>
                                    <MDBCarouselItem id='slid' itemId="4">
                                        <MDBView>
                                            <img id='slid1'
                                                className="d-block w-100"
                                                src="../images/ecommerce4.png"
                                                alt="Mattonit's item"
                                            />
                                            <MDBMask overlay="black-light" />
                                        </MDBView>
                                        <MDBCarouselCaption>
                                            <h3 className="h3-responsive" id="h3slide">Sopot Beach</h3>
                                            <p>Taken june 21th by @mattonit</p>
                                        </MDBCarouselCaption>
                                    </MDBCarouselItem>
                                </MDBCarouselInner>
                            </MDBCarousel>

                            <hr />
                        </div>
                        <div className="col-md-5">
                            <div className="login-wrap">
                                <div className="login-html">
                                    <div className="login-form">
                                        <div className="sign-in-htm">
                                            <div className="sign-up-htm">
                                                <center>
                                                    <img id="image-login" src="../images/logo.png" alt="logoimage" />
                                                </center>

                                                {/* formulaire inscription  */}
                                                <form>
                                                    <div className="form-group">
                                                        <MDBInput label="Nom" icon="user" id="un" type="text" className="input" name="nom" value={this.state.value} placeholder="nom d'utilisateur" onChange={this.handleChange} />
                                                        <MDBInput label="Prenom" icon="user" id="deux" type="text" className="input" name="prenom" value={this.state.value} placeholder="prenom d'utilisateur" onChange={this.handleChange} />
                                                        <MDBInput label="Adresse e-mail" icon="at" id="ml" type="email" className="input" name="email" value={this.state.value} placeholder="exemple@exemple.com" onChange={this.handleChange} />
                                                        <MDBInput label="Specialités" icon="user" id="trois" type="text" className="input" name="specialite" value={this.state.value} placeholder="spécialités d'utilisateur" onChange={this.handleChange} />
                                                        <MDBInput label="Mots de passe" icon="lock" id="pw" type="passWord" className="input" name="password" value={this.state.value} placeholder="********" onChange={this.handleChange} />
                                                        <MDBInput label="Confirmer Mots de passe" icon="unlock" id="" type="passWord" className="input" data-type="passWord" name="pwd" value={this.state.value} placeholder="********" onChange={this.handleChange} />
                                                        <p id='pass'></p>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<MDBBtn className="button" ronded='true' id="boutton" onClick={e => {
                                                            e.preventDefault()
                                                            console.log('local enregistrement: ', localStorage.getItem('login'));
                                                            this.enregistrement({
                                                                nom: this.state.nom,
                                                                prenom: this.state.prenom,
                                                                specialite: this.state.specialite,
                                                                email: this.state.email,
                                                                password: this.state.password,
                                                                pwd: this.state.pwd
                                                            })
                                                            this.renderRedirect()
                                                            this.setState({ nom: '', prenom: '', specialite: '', email: '', password: '', pwd: '', connecte: false })
                                                        }}>S'inscrire</MDBBtn>
                                                    </div>
                                                </form>
                                                <center><MDBNavLink rel="noopener noreferrer" className="autre nav-link Ripple-parent" to='/login'>J'ai déjà un compte</MDBNavLink></center>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        client: state
    }
}
export default connect(mapStateToProps)(Register)
