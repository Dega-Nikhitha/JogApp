let positions = [];
let watchId;
let startTime;
let canvas = document.getElementById("mapCanvas");
let ctx = canvas.getContext("2d");

function startJog() {
	
  if (!navigator.geolocation) {
    alert("Geolocation is not supported!");
    return;
  }

  startTime = new Date();
  positions = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById("status").innerText = "Jogging...";

  watchId = navigator.geolocation.watchPosition(pos => {
    const { latitude, longitude } = pos.coords;
    console.log("Location:", latitude, longitude);

    positions.push({ lat: latitude, lng: longitude });

    drawPath();
  }, err => {
    alert("Error getting location: " + err.message);
  }, { enableHighAccuracy: true });
  console.log("Tracked points:", positions);

}
function calculateDistanceInKm(points) {
  const R = 6371; // Radius of Earth in km
  let total = 0;

  for (let i = 1; i < points.length; i++) {
    const lat1 = points[i - 1].lat;
    const lon1 = points[i - 1].lng;
    const lat2 = points[i].lat;
    const lon2 = points[i].lng;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    total += R * c;
  }

  return total;
}

function toRad(value) {
  return value * Math.PI / 180;
}


function stopJog() {
	alert("Stop jog clicked!");
  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
  }

  let endTime = new Date();
  let duration = new Date(endTime - startTime).toISOString().substr(11, 8); // HH:mm:ss

  // Dummy distance estimate
  let distance = calculateDistanceInKm(positions).toFixed(2);
 // 10 meters per point

  const session = {
    userId: "user123",
    distanceInKm: distance,
    duration: duration,
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
    pathJson: JSON.stringify(positions)
  };

  fetch("http://localhost:8080/api/jog/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(session)
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("status").innerText = `Jog Saved ✅ Distance: ${distance} km`;
    checkNetworkStatus();
  })
  .catch(err => {
    console.error("Error saving jog:", err);
    document.getElementById("status").innerText = "Error saving jog ❌";
  });
}

function drawPath() {
  if (positions.length < 2) return;

  const scale = 10000;
  ctx.beginPath();
  for (let i = 1; i < positions.length; i++) {
    const x1 = (positions[i - 1].lng - positions[0].lng) * scale + 100;
    const y1 = (positions[i - 1].lat - positions[0].lat) * -scale + 100;
    const x2 = (positions[i].lng - positions[0].lng) * scale + 100;
    const y2 = (positions[i].lat - positions[0].lat) * -scale + 100;

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  }
  ctx.strokeStyle = "blue";
  ctx.stroke();
}

function checkNetworkStatus() {
  if ('connection' in navigator) {
    const conn = navigator.connection;
    const type = conn.effectiveType || "unknown";
    const speed = conn.downlink || 0;
    document.getElementById("status").innerText += ` | Network: ${type}, Speed: ${speed} Mbps`;
  } else {
    document.getElementById("status").innerText += " | Network info not supported";
  }
}
