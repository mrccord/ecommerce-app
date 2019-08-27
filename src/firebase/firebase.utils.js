import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyBOH663R4k22dGcp3IyRzKkUseG5hgqe8k",
    authDomain: "e-commerce-app-bc4c4.firebaseapp.com",
    databaseURL: "https://e-commerce-app-bc4c4.firebaseio.com",
    projectId: "e-commerce-app-bc4c4",
    storageBucket: "",
    messagingSenderId: "1057611450869",
    appId: "1:1057611450869:web:2725dfc6e31a7c1e"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = userRef.get();
    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (err) {
            console.log("error creating user", err.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
