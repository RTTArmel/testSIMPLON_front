import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { MDBNavbar, MDBInput, MDBBtn, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBContainer } from "mdbreact";
import { confirmAlert } from 'react-confirm-alert'; // Import
import './article.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import Footer from './../components/Footer';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseID: "",
            comment: [],
            modal: false,
            nom: '',
            prenom: '',
            specialite: '',
            email: '',
            password: '',
            pwd: ''
        };
        this.handleChange = this.handleChange.bind(this)
        this.enregistrement = this.enregistrement.bind(this)
    }

    enregistrement(e) {
        const action = { type: "INSCRIRE", value: e }
        this.props.dispatch(action)
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            var url = '/article/' + this.state._id
            return <Redirect to={url} />
        }
    }

    componentDidMount() {
        axios.get("https://tsiorytahback.herokuapp.com/profil").then(res => {
            // axios.get("http://localhost:8080/profil").then(res => {
            var tab = []
            console.log('res.data: ', res.data);
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].active == true) {
                    tab.push(res.data[i])
                }
            }
            this.setState({ comment: tab })
            console.log('state comment: ', this.state.comment)
        })
    }

    render() {
        return (
            <div className="homePage">
                <div>
                    <MDBNavbar id="Totalhome" color="bg-primary" dark expand="md" scrolling>

                        <MDBNavbarBrand>
                            <img src="../images/logo.png" id="logo-header" alt="ExtraCOOK" />
                            <strong className="white-text">ExtraComm</strong>
                        </MDBNavbarBrand>
                        <MDBNavbarToggler />
                        <MDBCollapse id="navbarCollapse" isOpen={this.state.collapseID} navbar>
                            <MDBNavbarNav right>
                                <MDBNavItem>
                                    <MDBNavLink to="/login" className="accueil">Connexion</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="/register" className="accueil">Créer Compte</MDBNavLink>
                                </MDBNavItem>
                            </MDBNavbarNav>
                        </MDBCollapse>

                    </MDBNavbar>
                </div>
                {/* {this.renderRedirect()} */}

                <div className='container'>
                    <div className='row'>
                        {this.state.comment.length > 0 ? (this.state.comment.sort((a, b) => { return b._id - a._id }).map((article, _id) => (
                            <div className='col-md-3 carte' key={_id}>
                                <div className="card">
                                    <img class="card-img-top img-thumbnail" src={"https://tsiorytahback.herokuapp.com/profil/" + article.image} alt={article.titre} />
                                    {/* <img class="card-img-top img-thumbnail" src={"http://localhost:8080/profil/" + article.image} alt={article.titre} /> */}
                                    <div class="card-body">
                                        <center>
                                            <h5 class="card-title">{article.titre}</h5>
                                            <p class="test">Description: {article.description}</p>
                                            <p class="test">Prix: {article.prix}</p>
                                            <p className="test">Place disponible: {article.reserve.length}/{article.disponible}</p>
                                            <MDBBtn rounded className="button" id="boutton" onClick={e => {
                                                confirmAlert({
                                                    customUI: ({ onClose }) => {
                                                        return (
                                                            <center>
                                                                <div className="custom-ui">
                                                                    <table>
                                                                        <td>
                                                                            {/* <img class="card-img-top img-thumbnail sary" src={"http://localhost:8080/profil/" + article.image} alt={article.titre} /><br />*/}
                                                                            <img class="card-img-top img-thumbnail sary" src={"https://tsiorytahback.herokuapp.com/profil/" + article.image} alt={article.titre} /><br />
                                                                            <p className="text-pop">{article.titre}</p>
                                                                            <p className="text-pop">Prix: {article.prix}</p>
                                                                            <p className="text-pop">Place disponible: {article.reserve.length}/{article.disponible}</p>
                                                                        </td>
                                                                        <td>

                                                                            <p className="text-pop">Veillez remplir ce Formulaire pour valider votre Inscription </p>
                                                                            <MDBInput size="sm" label="Nom" icon="user" id="un" type="text" className="input" name="nom" value={this.state.value} placeholder="nom d'utilisateur" onChange={this.handleChange} />
                                                                            <MDBInput size="sm" label="Prenom" icon="user" id="deux" type="text" className="input" name="prenom" value={this.state.value} placeholder="prenom d'utilisateur" onChange={this.handleChange} />
                                                                            <MDBInput size="sm" label="Téléphone" icon="at" id="ml" type="number" className="input" name="telephone" value={this.state.value} placeholder="exemple@exemple.com" onChange={this.handleChange} />
                                                                            <MDBInput size="sm" label="Adresse e-mail" icon="user" id="trois" type="email" className="input" name="email" value={this.state.value} placeholder="spécialités d'utilisateur" onChange={this.handleChange} />
                                                                            <center>
                                                                                <button className="btn btn-dark"
                                                                                    onClick={() => {
                                                                                        this.enregistrement({
                                                                                            nom: this.state.nom,
                                                                                            prenom: this.state.prenom,
                                                                                            telephone: this.state.telephone,
                                                                                            email: this.state.email
                                                                                        })
                                                                                        onClose();
                                                                                    }}
                                                                                >OUI</button>
                                                                            </center>
                                                                        </td>
                                                                    </table>
                                                                </div>
                                                            </center>
                                                        );
                                                    }
                                                })
                                            }}>S'inscrire</MDBBtn>
                                        </center>
                                    </div>
                                </div>
                                <br />
                                <div className='vide'></div>
                            </div>
                        )
                        )) : ''}
                        <br />
                    </div>
                </div>

                <Footer />
            </div>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        client: state
    }
}
export default connect(mapStateToProps)(Home)

