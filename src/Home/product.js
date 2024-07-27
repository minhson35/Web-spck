import { initializeApp } from  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from  "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
const emailInput = document.getElementById('email');
let imageInput = document.getElementById('image')

const dataList = document.getElementById('data-list');

// Add or update data in Firestore
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = nameInput.value;
    const email = emailInput.value;
    const image = imageInput.value;


    if (form.dataset.id) {
        // Update existing document
        const id = form.dataset.id;
        try {
            const userRef = doc(db, 'usersInfo', id);
            await updateDoc(userRef, { name, email, image });
            nameInput.value = '';
            emailInput.value = '';
            imageInput.value = '';
            form.dataset.id = '';
            form.querySelector('button').textContent = 'Update';
            console.log('Document successfully updated');
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    } else {
        // Add new document
        try {
            await addDoc(collection(db, 'usersInfo'), { name, email, image });
            nameInput.value = '';
            emailInput.value = '';
            imageInput.value = '';
            console.log('Document successfully added');
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    }
});

// Fetch data from Firestore in real-time
onSnapshot(collection(db, 'usersInfo'), (snapshot) => {
    dataList.innerHTML = '';
    snapshot.forEach((docId) => {
        const div = document.createElement('div');
        div.classList.add('tour_item')
        div.setAttribute('data-id', docId.id);
        div.innerHTML = `
            <img class="img_tour" src=${docId.data().image} />
            <h1 class="name_tour">${docId.data().name}</h1>
            <p class="des_tour">${docId.data().email}</p>
            <button class="Booking_tour"> Booking Now </button>

        `;
        dataList.appendChild(div);
    });
});