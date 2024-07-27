import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut,} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

document.addEventListener("DOMContentLoaded", () => {
  const handleSignOut = () => {
    signOut(auth);
    localStorage.removeItem("displayName");
  };
  onAuthStateChanged(auth, (user) => {
    const inforElement = document.getElementById("information");
    const displayName = localStorage.getItem("displayName");
    if (user) {
      const displayName = user.displayName || "User";
      inforElement.innerHTML = `
                <div>
                    <span class='hello'>Hello, </span>
                    <span id="displayName">${displayName}</span>
                    <button id='buttonSignOut'>Sign out</button>
                </div>
            `;
      const buttonSignOut = document.getElementById("buttonSignOut");
      buttonSignOut.addEventListener("click", handleSignOut);
    } else if (displayName) {
      inforElement.innerHTML = `
                <div>
                    <img id="avatar" 
                    <span class='hello'>Hello, </span>
                    <span id="displayName">${displayName}</span>
                    <button id='buttonSignOut'>Sign out</button>
                </div>
            `;
      const buttonSignOut = document.getElementById("buttonSignOut");
      buttonSignOut.addEventListener("click", handleSignOut);
    } else {
      inforElement.innerHTML = `
            <div class='signin'>
                <a href="/src/LoginScreen/login.html">Sign in</a>
            </div>
        `;
    }
  });
});z