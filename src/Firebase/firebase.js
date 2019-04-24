import app from 'firebase/app';


const config = {
    apiKey: "AIzaSyBpvV3UxNK--GI_Q0WFojfrjRPSyqLNt1Q",
    authDomain: "flux-238200.firebaseapp.com",
    databaseURL: "https://flux-238200.firebaseio.com",
    projectId: "flux-238200",
    storageBucket: "flux-238200.appspot.com",
    messagingSenderId: "103830355664"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
    }
}

export default Firebase;