import axios from 'axios'

const initialState = {
  client: [{
    nom: '',
    prenom: '',
    specialite: '',
    email: '',
    password: '',
    pwd: ''
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
