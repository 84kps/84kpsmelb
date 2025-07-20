import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

const toggleSwitch = document.getElementById("languageToggle");
toggleSwitch.addEventListener("change", function () {
  const enElements = document.querySelectorAll(".en");
  const guElements = document.querySelectorAll(".gu");

  enElements.forEach(el => el.style.display = this.checked ? "none" : "table-row");
  guElements.forEach(el => el.style.display = this.checked ? "table-row" : "none");
});
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDxpsqu-E8DGw0H4zeKqFqsoEVltnScQ5w",
  authDomain: "kpsmelbourne-2ec9a.firebaseapp.com",
  projectId: "kpsmelbourne-2ec9a",
  storageBucket: "kpsmelbourne-2ec9a.appspot.com",
  messagingSenderId: "484924325801",
  appId: "1:484924325801:web:ee9f81805c9294e3b08eb8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadMembers() {
  const grid = document.getElementById("gridBody");
  grid.innerHTML = "";
  const snapshot = await getDocs(collection(db, "members"));

  snapshot.forEach(doc => {
    const m = doc.data();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${m.name}</td>
      <td>${m.native}</td>
      <td>${m.suburb}</td>
      <td><a href="#" onclick='showDetails(${JSON.stringify(JSON.stringify(m.details))})'>View</a></td>
    `;
    grid.appendChild(row);
  });
}

window.showDetails = function(detailsStr) {
  const d = JSON.parse(detailsStr);
  const content = document.getElementById("modalContent");
  content.innerHTML = `
    <span class="close" onclick="document.getElementById('memberModal').style.display='none'">&times;</span>
    <img src="${d.image}" width="200" style="border-radius:10px;"><br><br>
    <b>Address:</b> ${d.address}<br>
    <b>Children:</b> ${d.children}<br><br>
    <b>Husband:</b> ${d.member1.name}, ${d.member1.mobile}, ${d.member1.email}, ${d.member1.work}<br>
    <b>Wife:</b> ${d.member2.name}, ${d.member2.mobile}, ${d.member2.email}, ${d.member2.work}<br>
    <b>Mosal:</b> ${d.mosal}<br>
    <b>Father:</b> ${d.father} &nbsp; <b>Mother:</b> ${d.mother}<br>
    <b>India Address:</b> ${d.indiaAddress}
  `;
  document.getElementById("memberModal").style.display = "block";
};

window.onload = loadMembers;
const toggleBtn = document.getElementById('langToggle');

toggleBtn.addEventListener('click', () => {
  const guRows = document.querySelectorAll('.gu');
  const enRows = document.querySelectorAll('.en');

  // If Gujarati rows currently hidden, show them, hide English
  if (guRows[0].style.display === 'none' || guRows[0].style.display === '') {
    guRows.forEach(row => row.style.display = '');
    enRows.forEach(row => row.style.display = 'none');
    toggleBtn.textContent = 'Switch to English';
  } else {
    // Show English, hide Gujarati
    guRows.forEach(row => row.style.display = 'none');
    enRows.forEach(row => row.style.display = '');
    toggleBtn.textContent = 'Switch to Gujarati';
  }
});
