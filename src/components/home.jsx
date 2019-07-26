import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask } from "mdbreact";
import { MDBNavbar, MDBInput, MDBBtn, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBContainer } from "mdbreact";
import { confirmAlert } from 'react-confirm-alert'; // Import
import './article.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import Footer from './../components/Footer';
import article from './article';

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

    // enregistrement(e) {
    //     const action = { type: "INSCRIRE", value: e }
    //     this.props.dispatch(action)
    // }

    enregistrement(e) {
        const data = new FormData()
        data.append('nom', this.state.nom);
        data.append('prenom', this.state.prenom);
        data.append('telephone', this.state.telephone);
        data.append('email', this.state.email);

        console.log('article id: ', article._id);

        fetch('https://tsiorytahback.herokuapp.com/particulier' + article._id, {
            // fetch('http://localhost:8080/profil', {
            method: 'POST',
            body: data,
        }).then((response) => {
            console.log('body respopnse: ', response);
        });
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
                if (res.data[i].active == true && res.data[i].reserve < res.data[i].disponible) {
                    tab.push(res.data[i])
                }
            }
            this.setState({ comment: tab })
            console.log('state comment: ', this.state.comment)
        })
    }

    componentDidUpdate() {
        axios.get("https://tsiorytahback.herokuapp.com/profil").then(res => {
            // axios.get("http://localhost:8080/profil").then(res => {
            var tab = []
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].active == true && res.data[i].reserve < res.data[i].disponible) {
                    tab.push(res.data[i])
                }
            }
            this.setState({ comment: tab })
        })
    }

    render() {
        return (
            <div className="homePage">
                <div>
                    <MDBNavbar id="Totalhome" color="bg-primary" dark expand="md" scrolling>

                        <MDBNavbarBrand>
                            <img src="../images/logo.png" id="logo-header" alt="ExtraCOOK" />
                            <strong className="white-text">ExtraCOOK</strong>
                        </MDBNavbarBrand>
                        <MDBNavbarToggler />
                        <MDBCollapse id="navbarCollapse" isOpen={this.state.collapseID} navbar>
                            <MDBNavbarNav right>
                                <MDBNavItem>
                                    <MDBNavLink to="/login" className="accueil">Connexion</MDBNavLink>
                                </MDBNavItem>
                                {/* <MDBNavItem>
                                    <MDBNavLink to="/register" className="accueil">Créer Compte</MDBNavLink>
                                </MDBNavItem> */}
                            </MDBNavbarNav>
                        </MDBCollapse>

                    </MDBNavbar>

                    <center>
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

                                    <MDBMask overlay="black-light" />
                                </MDBView>
                                <MDBCarouselCaption>
                                    <h3 className="h3-responsive " id="h3slide">ExtraCOOK est un centre de Formation pour les élève à partir de 12 ans</h3><br /><br /><br /><br />
                                </MDBCarouselCaption>
                            </MDBCarouselItem>
                            <MDBCarouselItem id='slid' itemId="2">
                                <MDBView>
                                    <img id='slid1'
                                        className="d-block w-100"
                                        src="../images/sary2.jpeg"
                                        alt="Second slide"
                                    />
                                    <MDBMask overlay="black-strong" />
                                </MDBView>
                                <MDBCarouselCaption>
                                    <h3 className="h3-responsive" id="h3slide">Mais c'est aussi réservé pour VOUS</h3><br />
                                    <h5 className="h3-responsive" id="h3slide">Jeune de 25 à 35 ans</h5>
                                    <h5 className="h3-responsive" id="h3slide">Ou seulement passionné(e) par la Cuisine</h5><br /><br /><br /><br />
                                </MDBCarouselCaption>
                            </MDBCarouselItem>
                            <MDBCarouselItem id='slid' itemId="3">
                                <MDBView>
                                    <img id='slid1'
                                        className="d-block w-100"
                                        src="../images/sary3.jpeg"
                                        alt="Third slide"
                                    />
                                    <MDBMask overlay="black-slight" />
                                </MDBView>
                                <MDBCarouselCaption>
                                    <h3 className="h3-responsive" id="h3slide">Financez nos élèves à aimer l'art de la CUISINE</h3><br /><br /><br /><br />
                                </MDBCarouselCaption>
                            </MDBCarouselItem>
                            <MDBCarouselItem id='slid' itemId="4">
                                <MDBView>
                                    <img id='slid1'
                                        className="d-block w-100"
                                        src="../images/sary4.jpeg"
                                        alt="Mattonit's item"
                                    />
                                    <MDBMask overlay="black-light" />
                                </MDBView>
                                <MDBCarouselCaption>
                                    <h3 className="h3-responsive" id="h3slide">Tout en apprenant aussi les moindres techniques de la CUISINE</h3><br /><br /><br /><br /><br /><br /><br /><br />
                                </MDBCarouselCaption>
                            </MDBCarouselItem>
                        </MDBCarouselInner>
                    </MDBCarousel>
                    </center>

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
                                            <p className="test">Place disponible: {article.reserve}/{article.disponible}</p>
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
                                                                            <p className="text-pop">Place disponible: {article.reserve}/{article.disponible}</p>
                                                                        </td>
                                                                        <td>

                                                                            <p className="text-pop">Veillez remplir ce Formulaire pour valider votre Inscription </p>
                                                                            <MDBInput size="sm" label="Nom" icon="user" id="un" type="text" className="input" name="nom" value={this.state.value} placeholder="nom d'utilisateur" onChange={this.handleChange} />
                                                                            <MDBInput size="sm" label="Prenom" icon="user" id="deux" type="text" className="input" name="prenom" value={this.state.value} placeholder="prenom d'utilisateur" onChange={this.handleChange} />
                                                                            <MDBInput size="sm" label="Téléphone" icon="phone" id="ml" type="number" className="input" name="telephone" value={this.state.value} placeholder="exemple@exemple.com" onChange={this.handleChange} />
                                                                            <MDBInput size="sm" label="Adresse e-mail" icon="at" id="trois" type="email" className="input" name="email" value={this.state.value} placeholder="spécialités d'utilisateur" onChange={this.handleChange} />
                                                                            <center>
                                                                                <button className="btn btn-dark"
                                                                                    onClick={() => {
                                                                                        const data = new FormData()
                                                                                        data.append('nom', this.state.nom);
                                                                                        data.append('prenom', this.state.prenom);
                                                                                        data.append('telephone', this.state.telephone);
                                                                                        data.append('email', this.state.email);

                                                                                        console.log('article id: ', article._id);

                                                                                        fetch('https://tsiorytahback.herokuapp.com/particulier/' + article._id, {
                                                                                            // fetch('http://localhost:8080/profil', {
                                                                                            method: 'POST',
                                                                                            body: data,
                                                                                        }).then((response) => {
                                                                                            console.log('body respopnse: ', response);
                                                                                        });
                                                                                        onClose();
                                                                                    }
                                                                                    }
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

