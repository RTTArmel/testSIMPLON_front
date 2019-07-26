import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Redirect } from 'react-router-dom'
import Routes from '../../src/components/Routes';
import TopNavigation from './../components/topNavigation';
import SideNavigation from './../components/sideNavigation';
import Footer from './../components/Footer';
import './../index.css'

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.renderRedirect = this.renderRedirect.bind(this)
    this.listeArticle = this.listeArticle.bind(this)
  }

  renderRedirect = () => {
    if (localStorage.getItem('login') == 'false') {
      return <Redirect to='/login' />
    }
  }

  listeArticle = (e) => {
    const action = { type: "GETARTICLE", value: e }
    this.props.dispatch(action)
  }

  render() {
    return (
      <div>
        <div className="flexible-content accueil">
          {this.renderRedirect()}
          <SideNavigation />
          <TopNavigation />
          <main>
            <div className='container'>
              <div className='row'>
                <div className='col-md-2'></div>
                <div className='col-md-8'>
                  <center>
                    <Routes />
                  </center>
                </div>
                <div className='col-md-2'></div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Admin;