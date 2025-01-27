import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, update, set, get, child } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB7gECnjb9gqmUvEiYg3TrbHJ1PwtMSjQM",
  authDomain: "warung-batan-sabo.firebaseapp.com",
  databaseURL: "https://warung-batan-sabo-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "warung-batan-sabo",
  storageBucket: "warung-batan-sabo.firebasestorage.app",
  messagingSenderId: "329628713983",
  appId: "1:329628713983:web:74dbe5314ce6428cc01dca",
  measurementId: "G-5Q77MM62L5"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
let totalharga;
let udahbayar;

function start() {
  const inpnm = document.getElementById("inpnma").value.toLowerCase();
  const dbpath = ref(db, `pesanan/${inpnm}`)

  get(dbpath)
    .then((snapshot) => {
      if(snapshot.exists()) {
        const data = snapshot.val();
        totalharga = data.totha;
        udahbayar = data.udahbayar;

        console.log(totalharga + "\n" + udahbayar)

        document.getElementById("tohaprev").innerHTML = "Nama : " + data.nama +  "<br>" + "Total Harga : " + totalharga + "<br>Keterangan : " + data.udahbayar
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function bayar() {
  //convert totalharga menjadi integer
  var inttotha = parseInt(totalharga.slice(0, -1))
  console.log(inttotha)

  //cek apakah udah bayar apa blom
  if(udahbayar != "belum") {
    alert("anda sudah membayar!")
  }else {
    if(parseInt(document.getElementById("inpbyr").value) == inttotha) {
      console.log(inttotha + "\n" + udahbayar)
      //update ke database
      const inpnm = document.getElementById("inpnma").value.toLowerCase();
      const dbpath = ref(db, `pesanan/${inpnm}`)

      update(dbpath, {udahbayar: "qris"})

      alert("anda berhasil membayar!")
    }else {
      alert("jumlah bayar anda kurang atau lebih!")
    }
  }
}
document.getElementById("cekbtn").addEventListener("click", start);
document.getElementById("bayarbtn").addEventListener("click", bayar);
