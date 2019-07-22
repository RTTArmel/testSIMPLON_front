import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBContainer } from "mdbreact";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask } from "mdbreact";
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { confirmAlert } from 'react-confirm-alert'; // Import
import './article.css'
import 'react-confirm-alert/src/react-confirm-alert.css'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseID: "",
            comment: [],
            modal: false,
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    }

    // toggleCollapse = collapseID => () =>
    //     this.setState(prevState => ({
    //         collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    //     }));

    renderRedirect = () => {
        if (this.state.redirect) {
            var url = '/article/' + this.state._id
            return <Redirect to={url} />
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8080/profil").then(res => {
            console.log('res comment: ', res.data)
            this.setState({ comment: res.data })
            console.log('comment: ', this.state.comment)
        })
    }

    render() {
        return (
            <div className="homePage">
                <div>
                    <MDBContainer className="pb-5">
                        <MDBNavbar id="Totalhome"
                            color="bg-primary"
                            dark
                            expand="md"
                            scrolling
                        >

                            <MDBNavbarBrand>
                                <img src="../images/logo.png" id="logo-header" alt="imagelogo" />
                                <strong className="white-text">ExtraComm</strong>
                            </MDBNavbarBrand>
                            <MDBNavbarToggler
                            // onClick={this.toggleCollapse("navbarCollapse")}
                            />
                            <MDBCollapse
                                id="navbarCollapse"
                                isOpen={this.state.collapseID}
                                navbar
                            >

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
                    </MDBContainer>

                </div>
                {/* {this.renderRedirect()} */}

                <div className='container'>
                    <div className='row'>
                        {this.state.comment.length > 0 ? (this.state.comment.sort((a, b) => { return b._id - a._id }).map((article, _id) => (
                            <div className='col-md-3 carte' key={_id}>
                                <div className="card">
                                    <button onClick={() => {
                                        confirmAlert({
                                            customUI: ({ onClose }) => {
                                                return (
                                                    <center>
                                                        <div className="custom-ui" id="popup">
                                                            <table>
                                                                <td>
                                                                    <img class="card-img-top img-thumbnail sary" src={"http://localhost:8080/profil/" + article.image} alt={article.titre} /><br />
                                                                    <img class="card-img-top img-thumbnail sary1" src={"http://localhost:8080/profil/" + article.image1} alt={article.titre} />
                                                                    <img class="card-img-top img-thumbnail sary1" src={"http://localhost:8080/profil/" + article.image2} alt={article.titre} />
                                                                </td>
                                                                <td>
                                                                    <h6 className="text-pop">Suppression du Produit: </h6><br />
                                                                    <h6 className="text-pop">{article.titre}</h6><br />
                                                                </td>
                                                            </table>
                                                            <button className="btn btn-dark"
                                                                onClick={() => {
                                                                    onClose();
                                                                }}
                                                            >OUI</button><a>&nbsp;&nbsp;</a>
                                                            <button className="btn btn-dark" onClick={onClose}>NON</button>
                                                        </div>
                                                    </center>
                                                );
                                            }
                                        })
                                    }
                                    }><img class="card-img-top img-thumbnail" src={"http://localhost:8080/profil/" + article.image} alt={article.titre} /></button>
                                    <div class="card-body">
                                        <center>
                                            <h5 class="card-title">{article.titre}</h5>
                                            <p class="test" style={{ textAlign: 'right' }}>Prix: {article.prix}</p>
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



{/* <MDBContainer key={_id}>
                                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                        <MDBModalHeader>{article.titre}</MDBModalHeader>
                                        <MDBModalBody>
                                            <center>
                                                <img class="card-img-top img-thumbnail" src={"http:localhost:8080/profil/" + article.image} alt={article.image} />
                                                <img class="card-img-top img-thumbnail" src={"http:localhost:8080/profil/" + article.image1} alt={article.image1} />
                                                <img class="card-img-top img-thumbnail" src={"http:localhost:8080/profil/" + article.image2} alt={article.image2} />
                                                <p>{article.description}</p>
                                                <p>{article.prix}</p>
                                            </center>
                                        </MDBModalBody>
                                        <MDBModalFooter>
                                            <MDBBtn color="secondary" onClick={() => { this.toggle() }}>Close</MDBBtn>
                                        </MDBModalFooter>
                                    </MDBModal>
                                </MDBContainer> */}

