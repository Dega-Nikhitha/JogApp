console.log("Loading jogging history...");

fetch("http://localhost:8080/api/jog/all")
  .then(res => {
    if (!res.ok) {
      throw new Error("Failed with status " + res.status);
    }
    return res.json();
  })
  .then(data => {
    console.log("Received sessions:", data);
    const container = document.getElementById("jogHistory");
    container.innerHTML = "";

    if (!data.length) {
      container.innerText = "No sessions found.";
      return;
    }

    data.forEach(session => {
      const card = document.createElement("div");
      card.className = "jog-card";

      const path = JSON.parse(session.pathJson || "[]");

      card.innerHTML = `
        <strong>User:</strong> ${session.userId} <br>
        <strong>Distance:</strong> ${session.distanceInKm} km<br>
        <strong>Duration:</strong> ${session.duration} <br>
        <strong>Start:</strong> ${new Date(session.startTime).toLocaleString()} <br>
        <strong>End:</strong> ${new Date(session.endTime).toLocaleString()} <br>
        <strong>Points:</strong> ${path.length}
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Fetch error:", err);
    document.getElementById("jogHistory").innerText = "Error loading sessions: " + err.message;
  });
