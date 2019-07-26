import axios from 'axios'

const initialState = {
  client: [{
    _id: '',
    titre: '',
    description: '',
    prix: '',
    date: '',
    debut: '',
    duree: '',
    reserve: '',
    disponible: '',
    image: '',
    active: '',
    utilisateur: ''
  }]
}

function connexion(state = initialState, action) {
  let nextState = [0]
  switch (action.type) {

    //postAdmin 8080
    case 'REGISTER':
      console.log("action: ", action.value);
      axios.post('https://tsiorytahback.herokuapp.com/register', action.value)
        // axios.post('http://localhost:8080/register/', action.value)
        .then((response) => {
          console.log("post action: ", action.value);
          console.log("post ok: res.data ", response.data);
          localStorage.setItem('id', parseInt(response.data._id))
          localStorage.setItem('user', response.data.nom)
          localStorage.setItem('login', 'true')
          console.log('reducer REGISTER: ', localStorage.getItem('login'));
        })
        .catch((error) => {
          console.log("erreur be: ", error);
        });
      break;

    case 'EDIT_PROFIL':
      console.log("action: ", action.value);
      axios.put('https://tsiorytahback.herokuapp.com/register/' + localStorage.getItem('id'), action.value)
        // axios.put("http://localhost:8080/register/" + localStorage.getItem('id'), action.value)
        .then((response) => {
          console.log("put ok: res.data ", response.data);
          localStorage.setItem('user', response.data[localStorage.getItem('id')].nom)
          console.log('reducer EDIT: ', localStorage.getItem('login'));
        })
        .catch((error) => {
          console.log("erreur be: ", error);
        });
      break;

    case 'DELETE_PROFIL':
      console.log("action: ", action.value);
      axios.delete('https://tsiorytahback.herokuapp.com/register/' + localStorage.getItem('id'), action.value)
        // axios.put("http://localhost:8080/register/" + localStorage.getItem('id'), action.value)
        .then((response) => {
          console.log("delete ok: res.data ", response.data);
          localStorage.setItem('id', 'none')
          localStorage.setItem('user', 'none')
        })
        .catch((error) => {
          console.log("erreur be: ", error);
        });
      break;

    //postLogin 8080
    case 'LOGIN':
      console.log("action: ", action.value);
      axios.post('https://tsiorytahback.herokuapp.com/login/', action.value)
        // axios.post('http://localhost:8080/login', action.value)
        .then((response) => {
          if (response.data.nom == action.value.nom) {
            localStorage.setItem('id', response.data._id)
            localStorage.setItem('user', response.data.nom)
            localStorage.setItem('login', 'true')
            console.log('TSIORY response: ', response.data);
          }
          console.log("post ok: res.data ", response);
        })
        .catch((error) => {
          console.log("erreur be: ", error);
        });
      break;

    case 'DECONNECT':
      localStorage.setItem('id', 'none')
      localStorage.setItem('user', 'none')
      localStorage.setItem('login', 'false');
      break;



    case 'GETARTICLE':
      axios.get('https://tsiorytahback.herokuapp.com/profil')
        // axios.get('http://localhost:8080/')
        .then(function (response) {
          nextState = response.data
          console.log("ttt", nextState);
          return nextState
        })
        .catch(function (error) {

          console.log(error);
        })
      break;


    case 'UPDATE_ARTICLE':
      console.log("action update: ", action.value);
      axios.put('https://tsiorytahback.herokuapp.com/profil', action.value)
        // axios.put('http://localhost:8080/profil/', action.value)
        .then((response) => {
          console.log("put action: ", action.value);
          console.log("put ok: res.data ", response.data);
          console.log('reducer PUT: ', localStorage.getItem('login'));
        })
        .catch((error) => {
          console.log("put action: ", action.value);
          console.log("erreur be: ", error);
        });
      break;

    case 'DELETE_ARTICLE':
      console.log("action: ", action.value);
      axios.delete('https://tsiorytahback.herokuapp.com/profil/' + action.value._id, action.value)
        // axios.post('http://localhost:8080/register/', action.value)
        .then((response) => {
          console.log("delete action: ", action.value);
          console.log("delete ok: res.data ", response.data);
          console.log('reducer DELETE: ', localStorage.getItem('login'));
        })
        .catch((error) => {
          console.log("erreur be: ", error);
        });
      break;

    case 'INSCRIRE':
      console.log("action: ", action.value);
      axios.post('https://tsiorytahback.herokuapp.com/particulier', action.value)
        // axios.post('http://localhost:8080/particulier/', action.value)
        .then((response) => {
          console.log("post action: ", action.value);
          console.log("post ok: res.data ", response.data);

          //DEBUT TEST
          if(response.date!=="erreur")
          axios.get('https://tsiorytahback.herokuapp.com/profil/')
            .then(res => {
              for (let i = 0; i < res.data.length; i++) {
                if (res.data[i]._id == localStorage.getItem('atelier')) {
                  this.setState({
                    _id: res.data[i]._id,
                    titre: res.data[i].titre,
                    description: res.data[i].description,
                    prix: res.data[i].prix,
                    date: res.data[i].date,
                    debut: res.data[i].debut,
                    duree: res.data[i].duree,
                    reserve: res.data[i].reserve,
                    disponible: res.data[i].disponible,
                    image: res.data[i].image,
                    active: res.data[i].active,
                    utilisateur: res.data[i].utilisateur,
                  })
                }
              }
            })
          const data = new FormData();
          data.append('image', this.state.image);
          data.append('titre', this.state.titre);
          data.append('description', this.state.description);
          data.append('prix', this.state.prix);
          data.append('utilisateur', localStorage.getItem('id'))
          data.append('date', this.state.date);
          data.append('duree', this.state.duree);
          data.append('debut', this.state.debut);
          data.append('reserve', parseInt(this.state.reserve)+1);
          data.append('disponible', this.state.disponible);
          data.append('active', true)
          console.log('local atelier', localStorage.getItem('atelier'));

          fetch('https://tsiorytahback.herokuapp.com/profil/' + localStorage.getItem('atelier'), {
            // fetch('http://localhost:8080/profil', {
            method: 'PUT',
            body: data,
          }).then((response) => {
            response.json().then((body) => {
              console.log('body: ', body);

              this.setState({
                // image: `http://localhost:8080/profil/${body.image}`,
                image: `https://tsiorytahback.herokuapp.com/profil/${body.titre}` + localStorage.getItem('atelier') + '.jpg',
              });
            });
          });

          //FIN TEST

        })
        .catch((error) => {
          console.log("erreur be: ", error);
        });
      break;

    default:
      return state
  }
}

export default connexion
