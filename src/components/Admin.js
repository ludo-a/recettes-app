import React, { Component } from 'react';
import AjouterRecette from './AjouterRecette';
import firebase from 'firebase/app'
import 'firebase/auth'
import base, { firebaseApp } from '../base'
import Login from './Login'

class Admin extends Component {
    state = {
        uid: null,
        chef: null,
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged( user => {
            if(user){
                this.handleAuth({ user })
            }
        })
    }

    handleAuth = async authData => {
        const box = await base.fetch(this.props.pseudo, { context: this })
        if (!box.chef) {
            await base.post(`${this.props.pseudo}/chef`, {
                data: authData.user.uid
            })
        }

        this.setState({
            uid: authData.user.uid,
            chef: box.chef || authData.user.uid
        })
    }

    authenticate = () => {
        const authProvider = new firebase.auth.FacebookAuthProvider()
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.handleAuth)
    }

    logout = async () => {
        console.log('Déconnexion');
        await firebase.auth().signOut()
        this.setState({ uid: null })
        this.visiButton();
    }

    visiButton = (status) => {
        var button = document.getElementsByClassName('deleteBtn');
        if(status === true){
            for(let i = 0; i < button.length; i++){
                button[i].style.visibility = 'visible';
            }
        } else {
            for(let i = 0; i < button.length; i++){
                button[i].style.visibility = 'hidden';
            }
        }
    }

    render() {
        const { ajouterRecette, chargerExemple } = this.props;

        const logout = <button onClick={this.logout}>Déconnexion</button>

        //Si utilisateur pas connecté
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} ></Login>
        }

        if (this.state.uid !== this.state.chef) {
            this.visiButton();
            return (
                <div>
                    <p>Tu n'est pas le chef de cette boite</p>
                    { logout }
                </div>
            )
        }
        //Si connecté
            this.visiButton(true);//affichage du bouton suppression
            return (
                <div className="cards">
                    <AjouterRecette ajouterRecette={ajouterRecette} />
                    <footer>
                        { logout }
                        <button onClick={chargerExemple}>Remplir</button>
                    </footer>
                </div>
            
        );
    }
}

export default Admin;