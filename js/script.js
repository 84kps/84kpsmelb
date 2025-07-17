 const members = [
      { name: "Ajay Patel (Adiwada)", native: "Adiwada", suburb: "Cranbourne", hasDetails: true },
      { name: "Anil M. Patel (Venpura)", native: "Venpura", suburb: "Clayton" },
      { name: "Asha Tejas Patel (Chaveli)", native: "Chaveli", suburb: "Point Cook" },
      { name: "Ashish Patel (Jetpur)", native: "Jetpur", suburb: "Truganina" },
      { name: "Member 5", native: "Chansad", suburb: "Werribee" }
    ];

    const gridBody = document.getElementById("gridBody");

    members.forEach(member => {
      const tr = document.createElement("tr");

      const tdName = document.createElement("td");
      const a = document.createElement("a");
      a.textContent = member.name;
      a.href = "#";
      if (member.hasDetails) {
        a.onclick = () => showModal(member.name);
      }
      tdName.appendChild(a);

      const tdNative = document.createElement("td");
      tdNative.textContent = member.native;

      const tdSuburb = document.createElement("td");
      tdSuburb.textContent = member.suburb;

      tr.appendChild(tdName);
      tr.appendChild(tdNative);
      tr.appendChild(tdSuburb);

      gridBody.appendChild(tr);
    });

    function showModal(memberName) {
      document.getElementById("modalTitle").innerText = memberName;
      document.getElementById("memberModal").style.display = "block";
    }

    function closeModal() {
      document.getElementById("memberModal").style.display = "none";
    }

    window.onclick = function (event) {
      const modal = document.getElementById("memberModal");
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };