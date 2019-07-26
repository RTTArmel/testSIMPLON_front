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
      axios.post('https://tsiorytahback.herokuapp.com/register', action.value)
        // axios.post('http://localhost:8080/register/', action.value)
        .then((response) => {
          localStorage.setItem('id', parseInt(response.data._id))
          localStorage.setItem('user', response.data.nom)
          localStorage.setItem('login', 'true')
        })
      break;

    case 'EDIT_PROFIL':
      axios.put('https://tsiorytahback.herokuapp.com/register/' + localStorage.getItem('id'), action.value)
        // axios.put("http://localhost:8080/register/" + localStorage.getItem('id'), action.value)
        .then((response) => {
          localStorage.setItem('user', response.data[localStorage.getItem('id')].nom)
        })
      break;

    case 'DELETE_PROFIL':
      axios.delete('https://tsiorytahback.herokuapp.com/register/' + localStorage.getItem('id'), action.value)
        // axios.put("http://localhost:8080/register/" + localStorage.getItem('id'), action.value)
        .then((response) => {
          localStorage.setItem('id', 'none')
          localStorage.setItem('user', 'none')
        })
      break;

    //postLogin 8080
    case 'LOGIN':
      axios.post('https://tsiorytahback.herokuapp.com/login/', action.value)
        // axios.post('http://localhost:8080/login', action.value)
        .then((response) => {
          if (response.data.nom == action.value.nom) {
            localStorage.setItem('id', response.data._id)
            localStorage.setItem('user', response.data.nom)
            localStorage.setItem('login', 'true')
          }
        })
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
          return nextState
        })
      break;


    case 'UPDATE_ARTICLE':
      axios.put('https://tsiorytahback.herokuapp.com/profil', action.value)
        // axios.put('http://localhost:8080/profil/', action.value)
        .then((response) => {
          console.log("put action: ", action.value);
        })
      break;

    case 'DELETE_ARTICLE':
      axios.delete('https://tsiorytahback.herokuapp.com/profil/' + action.value._id, action.value)
        // axios.post('http://localhost:8080/register/', action.value)
        .then((response) => {
          console.log("delete action: ", action.value);
        })
      break;

    default:
      return state
  }
}

export default connexion
