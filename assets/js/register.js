import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDjyYF28Z16taI-mnKjPg_OuN51lLiNHvA",
  authDomain: "online-enrollment-system-8903f.firebaseapp.com",
  projectId: "online-enrollment-system-8903f",
  storageBucket: "online-enrollment-system-8903f.firebasestorage.app",
  messagingSenderId: "570519966907",
  appId: "1:570519966907:web:35cef1d99873685264c59e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

document.querySelector(".btn-submit").addEventListener("click", async () => {
  const email = document.querySelector('[placeholder="អ៊ីមែល/Email"]').value;
  const password = document.querySelector('[placeholder="ពាក្យសម្ងាត់/Password"]').value;
  const khmerName = document.querySelector('[placeholder="ឈ្មោះជាអក្សរខ្មែរ/Khmer Name"]').value;
  const latinName = document.querySelector('[placeholder="ឈ្មោះជាអក្សរឡាតាំង/Latin Name"]').value;
  const role = "student"; // default

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;

    await setDoc(doc(db, "users", uid), {
      email,
      khmerName,
      latinName,
      role,
      createdAt: new Date()
    });

    alert("Registered successfully!");
    location.href = "login.html";
  } catch (e) {
    alert("Error: " + e.message);
  }
});
