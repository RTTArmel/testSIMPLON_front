
import React, { Component } from 'react';
import { MDBContainer, MDBInput, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { Redirect } from 'react-router-dom'
import './postupload.css'

class PostFrontToBack extends React.Component {
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
            active: false,
            modal: false
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this)
    }

    renderRedirect = () => {
        this.setState({
            modal: !this.state.modal,
        })
        return <Redirect to='/admin/article' />
    }

    toggle = () => {
        this.handleUploadImage()
        this.setState({
            modal: !this.state.modal,
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
            active: false,
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleUploadImage(ev) {
        const data = new FormData();
        if(this.refs.box.checked){
            data.append('active', true);
        } else {data.append('active', false)}
        data.append('image', this.uploadInput.files[0]);
        data.append('titre', this.state.titre);
        data.append('description', this.state.description);
        data.append('prix', this.state.prix);
        data.append('utilisateur', localStorage.getItem('id'))
        data.append('date', this.state.date);
        data.append('duree', this.state.duree);
        data.append('debut', this.state.debut);
        data.append('disponible', this.state.disponible);

        fetch('https://tsiorytahback.herokuapp.com/profil', {
            // fetch('http://localhost:8080/profil', {
            method: 'POST',
            body: data,
        }).then((response) => {
            response.json().then((body) => {
                this.setState({
                    // image: `http://localhost:8080/profil/${body.image}`,
                    // image1: `http://localhost:8080/profil/${body.image1}`,
                    // image2: `http://localhost:8080/profil/${body.image2}`
                    image: `https://tsiorytahback.herokuapp.com/profil/${body.image}`,
                });
                console.log('ity ilay body.fil', body.image);
            });
        });
    }

    render() {
        return (

            <div className='container fluid w-100'> {/* //DEBUT */}

                <div class="card" style={{ width: "500px", marginLeft: "10%" }}>

                    <h5 class="card-header info-color white-text text-center">
                        <strong>NOUVEL ATELIER</strong>
                    </h5>

                    <div class="card-body">

                        <form class="text">
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-9'></div>
                                    <div className='col-md-3 custom-control custom-switch'>
                                        <input ref="box" name="active" type="checkbox" class="custom-control-input" id="customSwitches"/>
                                        <label class="custom-control-label" for="customSwitches">Publier</label>
                                    </div>
                                </div>
                            </div>

                            <MDBInput label="Nom du Produit" id="un" type="text" className="input black-text" name="titre" value={this.state.value} onChange={this.handleChange} />
                            <MDBInput label="Descriptions" size="lg" id="ml" type="textarea" rows="3" className="input black-text" name="description" value={this.state.value} onChange={this.handleChange} />
                            <MDBInput label="Prix" size="lg" id="pw" type="number" className="input black-text" name="prix" value={this.state.value} onChange={this.handleChange} />
                            <MDBInput label="Date" size="lg" id="ml" type="date" className="input black-text" name="date" value={this.state.value} onChange={this.handleChange} />
                            <MDBInput label="Heure de début" size="lg" id="ml1" type="time" className="input black-text" name="debut" value={this.state.value} onChange={this.handleChange} />
                            <MDBInput label="Durée (heures)" size="lg" id="ml2" type="number" className="input black-text" name="duree" value={this.state.value} onChange={this.handleChange} />
                            <MDBInput label="Nombre de places" size="lg" id="ml3" type="number" className="input black-text" name="disponible" value={this.state.value} onChange={this.handleChange} />
                            <input ref={(ref) => { this.uploadInput = ref; }} type="file" name="image" />

                        </form>
                    </div>
                    <MDBContainer>
                        <MDBBtn onClick={this.toggle}>Ajouter</MDBBtn>
                        <MDBModal isOpen={this.state.modal}>
                            <MDBModalHeader>Enregistrement...</MDBModalHeader>
                            <MDBModalBody><center>Ajout du Produit avec succés</center></MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="secondary" onClick={() => { this.renderRedirect() }}>Close</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                    </MDBContainer>
                </div>
            </div>
        );
    }
}

export default PostFrontToBack;