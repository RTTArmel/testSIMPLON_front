import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'; // Import
import './article.css'
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
        this.update = this.update.bind(this)
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    }

    update(e) {
        console.log('local login: ', localStorage.getItem('login'));
        const action = { type: "UPDATE_ARTICLE", value: e }
        this.props.dispatch(action)
    }

    suppr() {
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
                                    <td>
                                    <p id="titre" onChange={this.handleChange}><img class="card-img-top img-thumbnail image" src={"https://tsiorytahback.herokuapp.com/profil/" + user.image} alt={user.titre} /></p>
                                        {/* <p id="titre" onChange={this.handleChange}><img class="card-img-top img-thumbnail image" src={"http://localhost:8080/profil/" + user.image} alt={user.titre} /></p> */}
                                        <p  id="prix" onChange={this.handleChange}>Prix: {user.prix}</p>
                                        <p >Place dispo: 0/{user.disponible}</p>
                                    </td>
                                    <td>
                                    <strong>{user.titre}</strong>
                                        <p id="description" onChange={this.handleChange}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos rerum itaque numquam, porro autem at maxime? Nemo porro ipsa tempore voluptas ullam, nam itaque doloremque, distinctio obcaecati eaque cumque quo.</p>
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
                                                                                {/* <img class="card-img-top img-thumbnail sary" src={"http://localhost:8080/profil/" + user.image} alt={user.titre} /><br /> */}
                                                                                <img class="card-img-top img-thumbnail sary" src={"https://tsiorytahback.herokuapp.com/profil/" + user.image} alt={user.titre} /><br />
                                                                            </td>
                                                                            <td>
                                                                                <h6 className="text-pop">Suppression de l'Atelier: </h6><br />
                                                                                <h6 className="text-pop">{user.titre}</h6><br />
                                                                            </td>
                                                                        </table>
                                                                        <button className="btn btn-dark"
                                                                            onClick={() => {
                                                                                this.state.suppr()
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
                                                    confirmAlert({
                                                        customUI: ({ onClose }) => {
                                                            return (
                                                                <form id='ID_FORMULAIRE'>
                                                                    <center>
                                                                        <div className="custom-ui" id="popup">
                                                                            <input name='inputStoreID' placeholder={user.prix} id="entree" className="modif" value={this.state.value} onChange={this.handleChange}></input><br />
                                                                            <p id="e"></p><br />

                                                                            <button className="btn btn-dark"
                                                                                onClick= {
                                                                                    this.update({titre: this.state.titre, description: this.state.description, prix: this.state.prix, date: this.state.date, debut: this.state.debut, duree: this.state.duree, disponible: this.state.disponible, reserve: this.state.reserve})
                                                                                }
                                                                            >OK</button><a>&nbsp;&nbsp;</a>

                                                                            <button className="btn btn-dark" onClick={onClose}>Annuler</button>
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
