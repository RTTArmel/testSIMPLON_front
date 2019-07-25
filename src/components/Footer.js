import React from 'react';
import { MDBFooter, MDBBtn, MDBIcon } from 'mdbreact';

const Footer = () => {
    return (
        <MDBFooter className="text-center font-small darken-2 footer">
            <div className="pt-4">
                <MDBBtn outline color="white" tag="a" href="">ExtraCOOK@tsiory</MDBBtn>
                <MDBBtn outline color="white" tag="a" href=""><MDBIcon icon="graduation-cap" className="ml-2" /></MDBBtn>
                <hr className="my4" />
                <div class="footer-copyright text-center py-3">© 2019 Copyright:<a href="https://github.com/RTTArmel"> Tsioritsoa RAZAFINDRABE</a>
                </div>
            </div>
        </MDBFooter>
    );
}

export default Footer;