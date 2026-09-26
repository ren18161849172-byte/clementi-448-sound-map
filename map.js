"use strict";
const demoRecords = [{"id": "DEMO-01", "title": "DEMO 01 - Morning conversation", "time": "9/26/2026, 08:00:00", "source": "People and conversation", "rating": "2 - Slightly", "activity": "Eating or drinking", "description": "Hypothetical example: nearby conversation caused slight disturbance during breakfast. Time, location and rating are invented for this prototype.", "latitude": 1.313395949187001, "longitude": 103.76445293426514, "submitted": true, "status": "Published"}, {"id": "DEMO-02", "title": "DEMO 02 - Lunch tableware", "time": "9/26/2026, 12:15:00", "source": "Dishes and tray clearing", "rating": "4 - Very", "activity": "Eating or drinking", "description": "Hypothetical example: repeated clattering of dishes made a conversation difficult to follow during lunch. Time, location and rating are invented for this prototype.", "latitude": 1.3132296959124907, "longitude": 103.76461386680603, "submitted": true, "status": "Published"}, {"id": "DEMO-03", "title": "DEMO 03 - Ventilation while queuing", "time": "9/26/2026, 12:30:00", "source": "Cooking or ventilation equipment", "rating": "3 - Moderately", "activity": "Queuing or waiting", "description": "Hypothetical example: a steady equipment hum caused moderate disturbance while waiting for food. Time, location and rating are invented for this prototype.", "latitude": 1.313395949187001, "longitude": 103.76468896865843, "submitted": true, "status": "Published"}, {"id": "DEMO-04", "title": "DEMO 04 - Afternoon trolley movement", "time": "9/26/2026, 15:00:00", "source": "Deliveries or trolleys", "rating": "2 - Slightly", "activity": "Walking through", "description": "Hypothetical example: a passing trolley produced a brief rattling sound with slight disturbance to a passer-by. Time, location and rating are invented for this prototype.", "latitude": 1.3131117097109368, "longitude": 103.76434028148653, "submitted": true, "status": "Published"}, {"id": "DEMO-05", "title": "DEMO 05 - Evening conversation", "time": "9/26/2026, 18:30:00", "source": "People and conversation", "rating": "3 - Moderately", "activity": "Eating or drinking", "description": "Hypothetical example: overlapping conversations caused moderate disturbance during an evening meal. Time, location and rating are invented for this prototype.", "latitude": 1.3130259015608792, "longitude": 103.7645387649536, "submitted": true, "status": "Published"}];
const mapContainer = document.getElementById("demo-map");
if (typeof L === "undefined") {
  const fallback = document.createElement("p");
  fallback.className = "notice";
  fallback.textContent = "The map could not load. Read the five example reports in the table below.";
  mapContainer.replaceChildren(fallback);
} else {
  const map = L.map("demo-map", { scrollWheelZoom: false, maxZoom: 19 }).setView([1.31322, 103.76452], 19);
  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  let tileWarning;
  tiles.on("tileerror", () => {
    if (tileWarning) return;
    tileWarning = document.createElement("p");
    tileWarning.className = "small map-error";
    tileWarning.textContent = "Some background tiles could not load. The markers and table still show the five examples.";
    mapContainer.insertAdjacentElement("afterend", tileWarning);
  });
  demoRecords.forEach((r, i) => {
    const icon = L.divIcon({ className: "report-pin", html: String(i+1), iconSize: [30,30], iconAnchor: [15,15] });
    const card = document.createElement("div");
    const heading = document.createElement("h3");
    heading.textContent = r.title;
    card.append(heading);
    const facts = document.createElement("p");
    facts.textContent = "26 September 2026, " + r.time.split(", ")[1].slice(0,5) + " SGT | " + r.activity + " | Disturbance: " + r.rating;
    card.append(facts);
    const source = document.createElement("p");
    source.textContent = "Main sound source: " + r.source;
    card.append(source);
    const description = document.createElement("p");
    description.textContent = r.description;
    card.append(description);
    L.marker([r.latitude,r.longitude], {icon, title: r.title, alt: r.title, keyboard:true}).addTo(map).bindPopup(card, {maxWidth:330});
  });
}
