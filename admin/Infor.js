import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, updateDoc, deleteDoc, onSnapshot, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
const productTable = document.getElementById('product-table').getElementsByTagName('tbody')[0];

// Fetch products from Firestore in real-time
onSnapshot(collection(db, 'products'), (snapshot) => {
    productTable.innerHTML = '';
    snapshot.forEach((docId) => {
        const row = productTable.insertRow();
        row.setAttribute('data-id', docId.id);
        row.innerHTML = `
            <td>${docId.data().name}</td>         
            <td><img src=${docId.data().image}/></td>
             <td>${docId.data().description}</td>
            <td>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </td>
        `;

        // Edit product
        row.querySelector('.edit').addEventListener('click', () => {
            const newName = prompt("Enter new name:", docId.data().name);
            const newImage = prompt("Enter new price:", docId.data().image);
            const newDescription = prompt("Enter new description:", docId.data().description);

            if (newName !== null && newImage !== null && newDescription !== null) {
                try {
                    const productRef = doc(db, 'products', docId.id);
                    updateDoc(productRef, { name: newName, image: newImage, description:newDescription });
                    console.log('Product successfully updated');
                } catch (error) {
                    console.error('Error updating product: ', error);
                }
            }
        });

        // Delete product
        row.querySelector('.delete').addEventListener('click', async () => {
            const id = docId.id;
            try {
                await deleteDoc(doc(db, 'products', id));
                console.log(`Product with ID ${id} successfully deleted`);
            } catch (error) {
                console.log('Error deleting product: ', error);
            }
        });
    });
});
