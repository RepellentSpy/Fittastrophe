// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyARwQLPEbPbE3uKeMOmPO71ShAS_XLSoVQ", // Ano, toto bych neměl odhalovat, ale mně je to teď jedno
    authDomain: "fittastrophe-28f31.firebaseapp.com",
    projectId: "fittastrophe-28f31",
    storageBucket: "fittastrophe-28f31.appspot.com",
    messagingSenderId: "331169769818",
    appId: "1:331169769818:web:67a4309e3074507161eb63",
    measurementId: "G-K8QNJZYK2E"
};

// začít firebase app
initializeApp(firebaseConfig)

// začít services
const db = getFirestore() // db = database

// collection reference => colRef 
const colRef = collection(db, "statistics")
if (colRef) {
    console.log("🟢 Připojeno k Firebase")

}


// získat collection data
getDocs(colRef)
    .then((snapshot) => {
        let stats = [] // prázdný array
        snapshot.docs.forEach((doc) => {
            stats.push({ ...doc.data(), id: doc.id })
        })
        console.log(stats)
    })
    .catch(err => { // V případě erroru do konzole napíše errorovou zprávu
        console.log(err.message)
    })