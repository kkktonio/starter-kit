'use strict';

class ESDjob{

}

window.onload = function() {
  window.ESDjob = newnESDDjobs();
}

constructor ESDjob {

  constructor() {

    this._checkSetup();
    this.googleBtn = document.querySelector('#login-google');
    this._initFirebase();
    this._setupEvents();
  }

  _initFirebase(){
    this.auth = firebase.auth();
    this.db = firebase.firestore();

    const settings = {timestampsInSnapshots: true};
    this.db.settings(settings);

    this.storage = firebase.storage();
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
  }

_setupEvents(){
  
}

onAuthStateChanged(user) {
  console.log('user:', JSON.stringify(user));
  if (user){
    console.log("Connecté");
  }
  else{
    console.log("déconnecté");
  }
}

_checkSetup() {

}
