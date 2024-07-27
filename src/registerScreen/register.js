import Toastify from 'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify-es.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword,updateProfile,} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {doc,setDoc,getFirestore,} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBcZWn2RbO6RxllRL1QUG_UTUSopudcbag",
    authDomain: "spck-le-minh-son.firebaseapp.com",
    projectId: "spck-le-minh-son",
    storageBucket: "spck-le-minh-son.appspot.com",
    messagingSenderId: "582667618480",
    appId: "1:582667618480:web:4db28ec27a9a6eba9bd375"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const formSignUp = document.getElementById("form-signup");
const submitButton = document.getElementById("submit-btn");

formSignUp.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Disable the submit button
  submitButton.disabled = true;

  const loadingToast = Toastify({
    text: "Registering...",
    duration: -1, // Duration -1 means it will not automatically close
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    backgroundColor: "#333",
    stopOnFocus: true // Prevents dismissing of toast on hover
  }).showToast();

  let firstName = document.getElementById("input_firstName").value;
  let lastName = document.getElementById("input_lastName").value;
  let email = document.getElementById("input_Email").value;
  let password = document.getElementById("input_Password").value;
  let confirmPassword = document.getElementById("input_confirmPassword").value;


  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password,confirmPassword);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: firstName + " " + lastName,
    });

    await setDoc(doc(db, "users", user.uid), {
      firstName,
      lastName,
      email,
    });

    loadingToast.hideToast();

    Toastify({
      text: "Register Successfully!",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      backgroundColor: "#4CAF50",
      stopOnFocus: true // Prevents dismissing of toast on hover
    }).showToast();

    // Wait 3 seconds before redirecting
    setTimeout(() => {
      window.location.href = "/index.html";
    }, 3000);

  } catch (error) {
    loadingToast.hideToast();

    Toastify({
      text: "Error: " + error.message,
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      backgroundColor: "#f44336",
      stopOnFocus: true // Prevents dismissing of toast on hover
    }).showToast();
  } finally {
    submitButton.disabled = false;
  }
});