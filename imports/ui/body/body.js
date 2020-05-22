// corps de l'aplication, template
import './body.html';
import '../accueil/accueil.js';
import '../favoris/favoris.js';
import '../../../lib/routing.js';
import '../profil/profil.js';
import '../login/login.js';
import '../templates/creer.js';
import '../annonces/annonces.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import { Membres } from "../../api/membres.js";

Template.accueil.helpers({
  "element": () => Annonces.find({}).fetch()
});

Template.app_body.helpers({
  utilisateur: () => Meteor.user().username,
});

Template.app_body.events({
  'click #accueil'(event) {
    event.preventDefault();
    FlowRouter.go('accueil');
  },
  'click #favvoris'(event) {
    event.preventDefault();
    FlowRouter.go('favoris');
  },
  'click #profil'(event) {
    event.preventDefault();
    FlowRouter.go('profil');
  },
  'click #login'(event) {
    event.preventDefault();
    FlowRouter.go('login');
  },
  'click #logout'(event) {
    event.preventDefault();
    Meteor.logout();
  },
  'click #creation'(event) {
    event.preventDefault();
    FlowRouter.go('creation');
  },
  'click #nvlleAnnonce'(event) {
    event.preventDefault();
    FlowRouter.go('annonces');
  },

  'click #submit'(event) {
    event.preventDefault();
    const email = document.getElementById('inputEmail4').value;
    const mdp = document.getElementById('inputPassword4').value;
    const mdpCheck = document.getElementById('inputPasswordCheck').value;
    let localite = document.getElementById('localite').value;
    let npa = document.getElementById('npa').value;
    const profession = document.getElementById('profession').value;
    const sexe = document.getElementById('sexe').value;
    //  let date = document.getElementById('example-date-input').value;
    // let info = document.getElementById('exampleFormControlTextarea1').value;
    //  let url = document.getElementById('basic-url').value;
    if (mdp.length > 4) {
      if (mdp == mdpCheck) {
        if (email != '' && mdp != '' && profession != '' && sexe != '') {
          Accounts.createUser({
            username: email,
            password: mdp,
            profile: {
              profession,
              sexe,
            },
          },
          (error) => {
            if (error) {
              alert(error.message);
            } else {
              setTimeout(() => FlowRouter.go('accueil'), 200);
            }
          });
        } else {
          alert('Veuillez remplir tous les champs requis.');
        }
      } else {
        alert('Veuillez reconfirmer votre mot de passe.');
      }
    } else {
      alert('Votre mot de passe est trop court! Veuillez choisir un mot de passe de minimum 5 caractères. ');
    }
  },

});
