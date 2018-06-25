signInWithLogin()
 {
   let email = document.querySelector('#username').value;
   let pass  = document.querySelector('#userpass').value;

   if (email === '' || pass === '')
   {
     let data = {
       message: 'Please add a login and password',
       timeout: 4000
     };
     this.snackbar.MaterialSnackbar.showSnackbar(data);
     return;
   }

   this.auth.signInWithEmailAndPassword(email, pass)
   .then(result => {
     if (result) { this.loginPanel.close(); }
   })
   .catch(e => {
     console.error(e);
     let data = {
       message: 'Please add a correct login and password',
       timeout: 4000
     };
     this.snackbar.MaterialSnackbar.showSnackbar(data);
   });
 }

 updateProfile()
  {
    if (!this._checkUserConnected()) {return};

   let doc = this.db.collection('Profiles').doc(this.auth.currentUser.uid);

   doc.get().then(docSnap => {
     if (docSnap.exists)
     {
       let data = docSnap.data();

       this.profile.user.value  = data.name || '';
       this.profile.email.value = data.email || '';
       this.profile.job.value   = data.job || '';
       this.profile.tjm.value   = data.tjm || '';
     } else {
       this.profile.email.value = this.auth.currentUser.email;
     }

     doc.set({
       name: this.profile.user.value,
       email: this.profile.email.value,
       job: this.profile.job.value,
       tjm: this.profile.tjm.value
     }, {merge: true})
     .catch(function(error) {
       console.error('Error adding document: ', error);
     });
   }).catch(function(error) {
     console.error('Error adding document: ', error);
   });
 }

 _checkUserConnected()
  {
    // Return true if the user is signed in Firebase
    if (this.auth.currentUser) {return true;}

    // Display a message to the user using a Toast.
    var data = {
      message: 'You must sign-in first',
      timeout: 2000
    };
    this.snackbar.MaterialSnackbar.showSnackbar(data);
    return false;
  }

  this.profile = {};
  this.profile.user   = document.querySelector('#profile_user');
  this.profile.email  = document.querySelector('#profile_email');
  this.profile.job    = document.querySelector('#profile_job');
  this.profile.tjm    = document.querySelector('#profile_tjm');
  this.profile.update = document.querySelector('#profile_update');

  getJobs()
  {
    if (!this._checkUserConnected()) {return};

    let tab = document.querySelector('#jobslist');
    tab.innerHTML = ''; // clean it all !

    this.db.collection('Jobs').get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        this.renderJob(doc.data());
      })
    })
  }

  renderJob(doc)
 {
   let li = document.createElement('li');
   li.setAttribute('class', 'mdl-list__item mdl-list__item--three-line');

   let primary = document.createElement('span');
   primary.setAttribute('class', 'mdl-list__item-primary-content');

   let icon = document.createElement('i');
   icon.setAttribute('class', 'material-icons mdl-list__item-avatar');
   icon.textContent = 'person';

   primary.appendChild(icon);

   let name = document.createElement('span');
   name.textContent = doc.name;

   primary.appendChild(name);

   let secondary = document.createElement('span');
   secondary.setAttribute('class', 'mdl-list__item-secondary-content');

   let duration = document.createElement('span');

   duration.textContent = doc.duration + 'j';

      secondary.appendChild(duration);

      let city = document.createElement('span');
      city.textContent = doc.city;

      secondary.appendChild(city);

      li.appendChild(primary);
      li.appendChild(secondary);

      let tab = document.querySelector('#jobslist');
      tab.appendChild(li);
}

// 'use strict';
//
// class ESDjob{
//
// }
//
// window.onload = function() {
//   window.ESDjob = newnESDDjobs();
// }

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
