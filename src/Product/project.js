import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBcZWn2RbO6RxllRL1QUG_UTUSopudcbag",
  authDomain: "spck-le-minh-son.firebaseapp.com",
  projectId: "spck-le-minh-son",
  storageBucket: "spck-le-minh-son.appspot.com",
  messagingSenderId: "582667618480",
  appId: "1:582667618480:web:4db28ec27a9a6eba9bd375"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM elements
const form = document.getElementById('data-form');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const desInput = document.getElementById('description');

const dataList = document.getElementById('data-list');


// Fetch data from Firestore in real-time
onSnapshot(collection(db, 'products'), (snapshot) => {
    dataList.innerHTML = '';
    snapshot.forEach((docId) => {
        const div = document.createElement('div');
        div.setAttribute('data-id', docId.id);
        div.innerHTML = `
            <div class='image'>
                <img src=${docId.data().image}/>
            </div>
            <span>${docId.data().name}</span>
            <span>${docId.data().description}</span>
            
        `;
        dataList.appendChild(div);
    });
});
