import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { MDBContainer, MDBInput, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { confirmAlert } from 'react-confirm-alert'; // Import
import './article.css'
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: true,
            titre: '',
            description: '',
            utilisateur: '',
            prix: '',
            image: '',
            date: '',
            debut: '',
            duree: '',
            reserve: '',
            disponible: '',
            comment: [],
            modal: false,
        };
        this.handleChange = this.handleChange.bind(this)
        this.suppr = this.suppr.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleUploadImage(ev) {
        const data = new FormData();
        data.append('image', this.uploadInput.files[0]);
        data.append('titre', this.state.titre);
        data.append('description', this.state.description);
        data.append('prix', this.state.prix);
        data.append('utilisateur', localStorage.getItem('id'))
        data.append('date', this.state.date);
        data.append('duree', this.state.duree);
        data.append('debut', this.state.debut);
        data.append('reserve', 0);
        data.append('disponible', this.state.disponible);
        data.append('active', true)
        console.log('local atelier', localStorage.getItem('atelier'));
        
        fetch('https://tsiorytahback.herokuapp.com/profil/'+localStorage.getItem('atelier'), {
            // fetch('http://localhost:8080/profil', {
            method: 'PUT',
            body: data,
        }).then((response) => {
            response.json().then((body) => {
                console.log('body: ',body);
                
                this.setState({
                    // image: `http://localhost:8080/profil/${body.image}`,
                    image: `https://tsiorytahback.herokuapp.com/profil/${body.titre}`+localStorage.getItem('atelier')+'.jpg',
                });
            });
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    toggle = () => {
        this.handleUploadImage()
        this.setState({
            modal: !this.state.modal,
        });
    }

    suppr(e) {
        console.log('local login: ', localStorage.getItem('login'));
        const action = { type: "DELETE_ARTICLE", value: e }
        this.props.dispatch(action)
    }

    componentDidMount() {
        var tab = []
        console.log('props: ', this.props)
        axios.get("https://tsiorytahback.herokuapp.com/profil").then(res => {
            // axios.get("http://localhost:8080/profil").then(res => {
            console.log('res comment: ', res.data)
            for (let i = 0; i < res.data.length; i++) {
                if (localStorage.getItem('id') == res.data[i].utilisateur) {
                    tab.push(res.data[i])
                }
            }
            this.setState({ comment: tab })
            console.log('comment: ', this.state.comment)
        })
    }

    render() {
        return (
            // // AJOUT
            <center onSubmit={event => {
                event.preventDefault()
            }}>
                <table className="table table-bordered">
                    <tbody>
                        {(this.state.comment.length > 0) ? (
                            this.state.comment.sort((a, b) => { return b._id - a._id }).map((user, _id) => (
                                <tr key={_id}>
                                    <td id="titre">
                                        <p onChange={this.handleChange}><img class="card-img-top img-thumbnail image" src={"https://tsiorytahback.herokuapp.com/profil/" + user.image} alt={user.titre} /></p>
                                        {/* <p id="titre" onChange={this.handleChange}><img class="card-img-top img-thumbnail image" src={"http://localhost:8080/profil/" + user.image} alt={user.titre} /></p> */}
                                        <p id="prix" onChange={this.handleChange}>Prix: {user.prix}</p>
                                        <p >Place dispo: {user.reserve}/{user.disponible}</p>
                                    </td>
                                    <td className="col2">
                                        <h5>{user.titre}</h5>
                                        <p id="description" onChange={this.handleChange}>{user.description}</p>
                                        <p>
                                            {/* SUPPRESSION */}
                                            <button className="btn btn-danger"
                                                onClick={() => {
                                                    confirmAlert({
                                                        customUI: ({ onClose }) => {
                                                            return (
                                                                <center>
                                                                    <div className="custom-ui" id="popup">
                                                                        <table>
                                                                            <td>
                                                                                <img class="card-img-top img-thumbnail sary" src={"https://tsiorytahback.herokuapp.com/profil/" + user.image} alt={user.titre} /><br />
                                                                            </td>
                                                                            <td>
                                                                                <h6 className="text-pop">Suppression de l'Atelier: </h6><br />
                                                                                <h6 className="text-pop">{user.titre}</h6><br />
                                                                            </td>
                                                                        </table>
                                                                        <button className="btn btn-dark"
                                                                            onClick={() => {
                                                                                this.suppr({
                                                                                    _id: user._id,
                                                                                    titre: user.titre,
                                                                                    description: user.description,
                                                                                    date: user.date,
                                                                                    debut: user.debut,
                                                                                    duree: user.duree,
                                                                                    disponible: user.disponible,
                                                                                    reserve: user.reserve,
                                                                                    image: user.image,
                                                                                    active: false
                                                                                })
                                                                                onClose();
                                                                            }}
                                                                        >
                                                                            OUI
                                                            </button><a>&nbsp;&nbsp;</a>
                                                                        <button className="btn btn-dark" onClick={onClose}>NON</button>
                                                                    </div>
                                                                </center>
                                                            );
                                                        }
                                                    })
                                                }
                                                }
                                            >X</button>
                                            <a>&nbsp;</a>
                                            {/* MODIFICATION */}
                                            <button className="btn btn-success"
                                                onClick={() => {
                                                    console.log('id atelier: ', user._id);
                                                    
                                                    localStorage.setItem('atelier', user._id)
                                                    confirmAlert({
                                                        customUI: ({ onClose }) => {
                                                            return (
                                                                <form id='ID_FORMULAIRE' key={_id}>
                                                                    <center>
                                                                        <div className="custom-ui" id="popup">
                                                                            <div className="form-group">
                                                                                <div className='container'>
                                                                                    <div className='row'>
                                                                                        <div className='col-md-9'></div>
                                                                                        <div className='col-md-3 custom-control custom-switch'>
                                                                                            <input ref="box1" name="active" type="checkbox" class="custom-control-input" id="customSwitches1" />
                                                                                            <label class="custom-control-label" for="customSwitches1">Publier</label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='container'>
                                                                                    <div className='row'>
                                                                                        <div className='col-md-6'>
                                                                                            <MDBInput label={user.titre} id="un" type="text" className="input black-text" name="titre" value={this.state.value} onChange={this.handleChange} />
                                                                                            <MDBInput label={user.description} id="ml" type="textarea" rows="2" className="input black-text" name="description" value={this.state.value} onChange={this.handleChange} />
                                                                                            <MDBInput label={user.prix} id="pw" type="number" className="input black-text" name="prix" value={this.state.value} onChange={this.handleChange} /><br />
                                                                                        </div>
                                                                                        <div className='col-md-6'>
                                                                                            <MDBInput label={user.date} id="ml" type="date" className="input black-text" name="date" value={this.state.value} onChange={this.handleChange} />
                                                                                            <MDBInput label={user.debut} id="ml1" type="time" className="input black-text" name="debut" value={this.state.value} onChange={this.handleChange} />
                                                                                            <MDBInput label={user.duree} id="ml2" type="number" className="input black-text" name="duree" value={this.state.value} onChange={this.handleChange} />
                                                                                            <MDBInput label={user.disponible} id="ml3" type="number" className="input black-text" name="disponible" value={this.state.value} onChange={this.handleChange} />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div>
                                                                                        <center>
                                                                                        <input className='btn btn-dark' ref={(ref) => { this.uploadInput = ref; }} type="file" name="image" /><br />
                                                                                            <MDBBtn rounded className="button" id="boutton" onClick={e => {
                                                                                                console.log('local enregistrement: ', localStorage.getItem('login'));
                                                                                                onClose()
                                                                                            }}>Confirmer</MDBBtn>
                                                                                            <button className="btn btn-dark" onClick={onClose}>Annuler</button>
                                                                                        </center>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </center>
                                                                </form>
                                                            );
                                                        }
                                                    })
                                                }
                                                }
                                            >Edit</button>
                                        </p>
                                    </td>
                                </tr>
                            ))
                        ) : (
                                <tr>
                                    <td colSpan={4}></td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </center>


        )
    }
}

const mapStateToProps = (state) => {
    return {
        listeArticle: state
    }
}

export default connect(mapStateToProps)(Article)
