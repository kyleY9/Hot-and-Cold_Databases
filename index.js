/* === Imports === */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

/* === Firebase Setup === */
const firebaseConfig = {
    apiKey: "AIzaSyBvXb5UsowdLW4qXbKN-slaEgJ4mZOIXUg",
    authDomain: "hot-and-cold-bdda6.firebaseapp.com",
    projectId: "hot-and-cold-bdda6",
    storageBucket: "hot-and-cold-bdda6.firebasestorage.app",
    messagingSenderId: "758715608342",
    appId: "1:758715608342:web:443c02f831d6ab7f833437"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

/* === UI === */
const signOutButtonEl = document.getElementById("sign-out-btn")

/* == UI - Elements == */

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")

const userProfilePictureEl = document.getElementById("user-profile-picture")
const userGreetingEl = document.getElementById("user-greeting")

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)
signOutButtonEl.addEventListener("click", authSignOut)

/* === Main Code === */

showLoggedOutView()
signedInOrNot()

/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    console.log("Sign in with Google")
}

function authSignInWithEmail() {
    console.log("Sign in with email and password")
    /*  Challenge:
    1  Import the signInWithEmailAndPassword function from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"
    2 Use the code from the documentation to make this function work.
    3  Make sure to first create two consts, 'email' and 'password', to fetch the values from the input fields emailInputEl and passwordInputEl.
    4 If the login is successful then you should show the logged in view using showLoggedInView()
    5   If something went wrong, then you should log the error message using console.error.
    */

    const email = emailInputEl.value 
    const password = passwordInputEl.value

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // sendEmailVerification(auth.currentUser)
            //     .then(() => {
            //         console.log("Verification Email has been sent!")
            //         const interval = setInterval(() => {
            //             auth.currentUser.reload().then(() => {
            //                 if (userCredential.user.emailVerified) {
            //                     clearInterval(interval)
            //                     console.log("Successfully Verified!")
            //                     showLoggedInView()
            //                     showProfilePicture(userProfilePictureEl, user)
            //                     showUserGreeting(userGreetingEl, user)
            //                 }
            //             })
            //         }, 2000)               
            //     })
            showLoggedInView()
            showProfilePicture(userProfilePictureEl, auth.currentUser)
            showUserGreeting(userGreetingEl, auth.currentUser)
        })
        .catch((error) => {
            const errorMessage = error.message 
            console.log(errorMessage)
        })
}

function authCreateAccountWithEmail() {
    console.log("Sign up with email and password")
    /*  Challenge:
    1 Import the createUserWithEmailAndPassword function from from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
    2 Use the code from the documentation to make this function work.
    3 Make sure to first create two consts, 'email' and 'password', to fetch the values from the input fields emailInputEl and passwordInputEl.
    4 If the creation of user is successful then you should show the logged in view using showLoggedInView()
    5 If something went wrong, then you should log the error message using console.error.
    */

    const email = emailInputEl.value 
    const password = passwordInputEl.value
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showLoggedInView()
        })
        .catch((error) => {
            const errorMessage = error.message 
            console.log(errorMessage)
        })
}

function authSignOut() {
    /*  Challenge:
    Import the signOut function from 'firebase/auth'
    Use the code from the documentation to make this function work.
    If the log out is successful then you should show the logged out view using showLoggedOutView() 
    If something went wrong, then you should log the error message using console.error.
    */
   signOut(auth)
    .then(() => {
        showLoggedOutView()
    })
    .catch((error) => {
        const errorMessage = error.message 
        console.log(errorMessage)
    })
 }

 function signedInOrNot() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            showLoggedInView()
            showProfilePicture(userProfilePictureEl, auth.currentUser)
            showUserGreeting(userGreetingEl, auth.currentUser)
        } else {
            showLoggedOutView()
        }
    })
}

function showProfilePicture(imgElement, user) {
    if (user !== null) {
        if (user.photoURL === null) {
            imgElement.src = "assets/images/defaultPic.jpg"
        } else {
            imgElement.src = user.photoURL
        }
    }
}

function showUserGreeting(element, user) {
    if (user != null) {
        if (user.displayName === null) {
            element.textContent = "Hey friend, how are you?"
        } else {
            element.textContent = "Hello " + user.displayName + "!"
        }
    }
 }


/* == Functions - UI Functions == */

function showLoggedOutView() {
    hideView(viewLoggedIn)
    showView(viewLoggedOut)
 }
 
 
 function showLoggedInView() {
    hideView(viewLoggedOut)
    showView(viewLoggedIn)
 }
 
 
 function showView(view) {
    view.style.display = "flex"
 }
 
 
 function hideView(view) {
    view.style.display = "none"
 }
 
//credit: coursera