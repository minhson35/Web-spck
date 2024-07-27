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
const imageInput = document.getElementById('image');
const desInput = document.getElementById('description');

const dataList = document.getElementById('data-list');

// Add or update data in Firestore
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = nameInput.value;
    const image = imageInput.value;
    const description = desInput.value;

    if (form.dataset.id) {
        // Update existing document
        const id = form.dataset.id;
        try {
            const userRef = doc(db, 'products', id);
            await updateDoc(userRef, { name, image, description });
            nameInput.value = '';
            imageInput.value = '';
            desInput.value = '';
            form.dataset.id = '';
            form.querySelector('button').textContent = 'Update';
            console.log('Document successfully updated');
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    } else {
        // Add new document
        try {
            await addDoc(collection(db, 'products'), { name, image, description});
            nameInput.value = '';
            imageInput.value = '';
            desInput.value = '';
            console.log('Document successfully added');
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    }
});

// Fetch data from Firestore in real-time
onSnapshot(collection(db, 'products'), (snapshot) => {
    dataList.innerHTML = '';
    snapshot.forEach((docId) => {
        const li = document.createElement('li');
        li.setAttribute('data-id', docId.id);
        li.innerHTML = `
            <img src=${docId.data().image}/>
            <span>${docId.data().name}</span>
            <span>${docId.data().description}</span>
            

            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        `;
        dataList.appendChild(li);

        // Edit data
        li.querySelector('.edit').addEventListener('click', () => {
            nameInput.value = docId.data().name;
            imageInput.value = docId.data().image;
            desInput.value = docId.data().description;
            form.dataset.id = docId.id;
            form.querySelector('button').textContent = 'Update';
        });

        // Delete data
        li.querySelector('.delete').addEventListener('click', async () => {
            const id = docId.id;
            console.log(`Attempting to delete document with ID ${id}`);
            try {
                await deleteDoc(doc(db, 'products', id));
                console.log(`Document with ID ${id} successfully deleted`);
            } catch (error) {
                console.log('Error deleting document: ', error);
            }
        });
    });
});
