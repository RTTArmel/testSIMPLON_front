import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Nouveau from './postupload';
import Article from './article';
import MonProfil from './monProfil.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import './register.css'

class Routes extends React.Component {
  render() {
    return (
      <div className="contenu">
        <div className='container-fluid'>
          <Switch>
            <Route path='/admin/upload' component={Nouveau} />
            <Route path='/admin/article' component={Article} />
            <Route path='/admin/monProfil' component={MonProfil} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Routes;
