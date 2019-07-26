import React, {Fragment} from 'react';
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask } from "mdbreact";
import { MDBBtn, MDBInput, MDBNavLink, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import './register.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { BrowserRouter as Link } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nom: '', password: '', erreur: '' }
        this.handleChange = this.handleChange.bind(this)
        this.login = this.login.bind(this)
        // this.renderRedirect = this.renderRedirect.bind(this)
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

    login(e) {
        const action = { type: "LOGIN", value: e }
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
                                            src="../images/sary1.jpeg"
                                            alt="First slide"
                                        />

                                        
                                    </MDBView>
                                    <MDBCarouselCaption>
                                    </MDBCarouselCaption>
                                </MDBCarouselItem>
                                <MDBCarouselItem id='slid' itemId="2">
                                    <MDBView>
                                        <img id='slid1'
                                            className="d-block w-100"
                                            src="../images/sary2.jpeg"
                                            alt="Second slide"
                                        />
                                        
                                    </MDBView>
                                    <MDBCarouselCaption>
                                    </MDBCarouselCaption>
                                </MDBCarouselItem>
                                <MDBCarouselItem id='slid' itemId="3">
                                    <MDBView>
                                        <img id='slid1'
                                            className="d-block w-100"
                                            src="../images/sary3.jpeg"
                                            alt="Third slide"
                                        />
                                        
                                    </MDBView>
                                    <MDBCarouselCaption>
                                    </MDBCarouselCaption>
                                </MDBCarouselItem>
                                <MDBCarouselItem id='slid' itemId="4">
                                    <MDBView>
                                        <img id='slid1'
                                            className="d-block w-100"
                                            src="../images/sary4.jpeg"
                                            alt="Mattonit's item"
                                        />
                                        
                                    </MDBView>
                                    <MDBCarouselCaption>
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
                                        <div className="form-group">
                                            <center>
                                                <img id="image-login" src="../images/logo.png" alt="logoimage" />
                                            </center><br />
                                            <form>
                                                <div className="form-group">
                                                    <MDBInput label="Nom" size="lg" icon="user" id="user" type="text" className="input" name="nom" onChange={this.handleChange} value={this.state.value} />
                                                    <MDBInput label="Password" size="lg" icon="lock" id="pass" type="passWord" className="input" name="password" onChange={this.handleChange} value={this.state.value} />
                                                    <Fragment>
                                                        <MDBBtn className="button" id="boutton"  onClick={e => {
                                                this.login({
                                                    nom: this.state.nom,
                                                    password: this.state.password
                                                })
                                                this.setState({ nom: '', password: '', erreur: '' })
                                            }}>Se connecter</MDBBtn>
                                                    </Fragment>
                                                </div>
                                            </form>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

const mapStateToProps = (state) => {
    return {
        client: state
    }
}
export default connect(mapStateToProps)(Login)