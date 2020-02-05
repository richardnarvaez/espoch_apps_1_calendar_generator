import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// const config = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// };

const config = {
  apiKey: "AIzaSyBKPHC9DK08j2yp6ASY51rwOPkwS8_0RQU",
  authDomain: "unicalend.firebaseapp.com",
  databaseURL: "https://unicalend.firebaseio.com",
  projectId: "unicalend",
  storageBucket: "unicalend.appspot.com",
  messagingSenderId: "980645346554",
  appId: "1:980645346554:web:b9d8804abcd2b09f7b9d43",
  measurementId: "G-P2DFZ086XE"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.a = app.auth
    this.db = app.database();

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => {
    this.auth.signOut()
  }

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            console.log("SNAP:", snapshot.exists())
            if(snapshot.exists()){

              const dbUser = snapshot.val();

              // default empty roles
              if (!dbUser.roles) {
                dbUser.roles = {};
              }

              // merge auth and db user
              authUser = {
                uid: authUser.uid,
                email: authUser.email,
                emailVerified: authUser.emailVerified,
                providerData: authUser.providerData,
                ...dbUser,
              };
            }else{
              this.doSignOut();
            }
            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');

  admin = uid => this.db.ref(`admins/${uid}`);
  admins = () => this.db.ref('admins');

  // *** Message API ***

  message = uid => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref('messages');




  // REFERENCIAS PROPIAS DE LA APP OLMEGAS

  async getLive(url, funData, funError){
    await this.db.ref(url).on("value", funData , funError)
  }

  setCredit=(url)=>{
    let obj={
      aCredit: true,
      aEfectivo: true,
      aExpress: false,
      aNormal: true,
      aProgram: false,
      isSent: false,
    }
   this.db.ref(url).update(obj);
 }


 setQuitarCredit=(url)=>{
   let obj={
     aCredit: false,
     aEfectivo: true,
     aExpress: false,
     aNormal: true,
     aProgram: false,
     isSent: false,
   }
  this.db.ref(url).update(obj);
}




  async get(url, funData, funError){
    await this.db.ref(url).once("value", funData , funError)
  }

  setWorker = (url, obj)=>{
  
    let id = this.db.ref(url).push();
    obj.id = id.key;
    
    this.db.ref(id).set(obj);
    //this.db.ref(url+"/"+obj.cedula).set(obj);
  }

  setFlota = (url, obj)=>{
    
    this.db.ref(url+obj.placa).set(obj);
  }

  async addWorker(urlFlota, urlWork, idFlota){
    
    //asigno flota a trabajador
    let urlWorker = "/worker/"+urlWork
    var flota = {idFlota}
    await this.db.ref(urlWorker).update(flota)
    
    //asigno trabajador a flota
    let idEmpleado = {id: urlWork}
    await this.db.ref(urlFlota+"/workers/"+urlWork).update(idEmpleado)
  }

  async delete(url){
    
    await this.db.ref(url).remove();
  }

  async deleteFlota(urlFlota, idWorkers){
    
    for(let i=0;i<idWorkers.length;i++){
      let urlWorker = "/worker/"+idWorkers[i].id+"/idFlota" 
      
      await this.db.ref(urlWorker).remove();
    }
    await this.db.ref(urlFlota).remove();
  }

  async deleteWorker(urlWorker, urlFlota){
    await this.db.ref(urlWorker).remove();
    await this.db.ref(urlFlota).remove();
  }

  /*.orderByChild("type")*/
  async getfilter(url, txtfilter, funData, funError){
    if (txtfilter==="Todos"){
      await this.db.ref(url).on("value", funData , funError)
    }else
    {
      await this.db.ref(url).orderByChild("type").equalTo(txtfilter).on("value", funData , funError)
    }
  }
  
  async modify(url, obj) {
    
    await this.db.ref(url).update(obj);
  }

  async search(url, type, search, funData, funError){
    
    if (type === "Todos"){
      await this.db.ref(url).once("value", funData , funError)
    }else
    {
      await this.db.ref(url).orderByChild(type).equalTo(search).once("value", funData , funError)
    }
  }

  async filterDate(url, placa, funData, funError){
    
    await this.db.ref(url).orderByChild("flota").equalTo(placa).once("value", funData , funError)
    //await this.db.ref(url).orderByChild("date").startAt().endAt().once("value", funData , funError)
  }

}

export default Firebase;
