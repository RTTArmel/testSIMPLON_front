import React from 'react';
import { MDBInput, MDBBtn } from "mdbreact";
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
                        <div className="col-md-7 logo"></div>
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
                                                        <MDBInput label="Nom" size="lg" icon="user" id="un" type="text" className="input" name="nom" value={this.state.value} placeholder="nom d'utilisateur" onChange={this.handleChange} />
                                                        <MDBInput label="Prenom" size="lg" icon="user" id="deux" type="text" className="input" name="prenom" value={this.state.value} placeholder="prenom d'utilisateur" onChange={this.handleChange} />
                                                        <MDBInput label="Adresse e-mail" size="lg" icon="at" id="ml" type="email" className="input" name="email" value={this.state.value} placeholder="exemple@exemple.com" onChange={this.handleChange} />
                                                        <MDBInput label="Specialités" size="lg" icon="user" id="trois" type="text" className="input" name="specialite" value={this.state.value} placeholder="spécialités d'utilisateur" onChange={this.handleChange} />
                                                        <MDBInput label="Mots de passe" size="lg" icon="lock" id="pw" type="passWord" className="input" name="password" value={this.state.value} placeholder="********" onChange={this.handleChange} />
                                                        <MDBInput label="Confirmer Mots de passe" size="lg" icon="unlock" id="" type="passWord" className="input" data-type="passWord" name="pwd" value={this.state.value} placeholder="********" onChange={this.handleChange} />
                                                        <p id='pass'></p>
                                                        <MDBBtn gradient="purple" className="button" id="boutton" onClick={e => {
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
                                                <center><a href="/login">J'ai déjà un compte</a></center>
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
