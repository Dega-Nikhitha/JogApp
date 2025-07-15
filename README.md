# JogApp
1.Project Structure
📁 Full Folder Overview
css
Copy
Edit
jog-tracker/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/example/jogtracker/
│       │       ├── JogTrackerApplication.java
│       │       ├── controller/
│       │       │   └── JoggingController.java
│       │       ├── model/
│       │       │   └── JoggingSession.java
│       │       └── repository/
│       │           └── JoggingSessionRepository.java
│       └── resources/
│           ├── application.properties
│           └── static/
│               ├── index.html
│               ├── script.js
│               ├── history.html
│               └── history.js
├── pom.xml
✅ 2. 🔧 Technologies Used
Part	Tech Used
Backend	Spring Boot (Java), PostgreSQL
Frontend	HTML + JavaScript (Vanilla)
Web APIs	Geolocation API, Canvas API, Network Info API
HTTP	RESTful API via Spring Controllers
Tooling	Maven, Lombok (optional), Fetch API

✅ 3. 🔄 Application Flow Description
🎽 Use Case: Jogging Session Tracking
Step-by-step User Flow:
User opens index.html

Sees buttons: “Start Jog” and “Stop Jog”

Canvas displays jog path

Clicks "Start Jog"

Uses Geolocation API to get current position every few seconds

Saves positions in positions[]

Uses Canvas API to draw the jogging path

Clicks "Stop Jog"

Ends tracking (stops geolocation)

Uses Network Info API to check network status

Calculates:

Total distance (Haversine formula)

Total time (Start → Stop)

Sends all jog data to backend using fetch("/api/jog/save")

Backend Receives Data

Spring Boot controller receives POST request

Saves data into PostgreSQL via JPA repository

User opens history.html

Sends GET request to /api/jog/all

Displays all past jog sessions as cards using history.js

✅ 4. 🧠 How Data is Structured
🗃 JoggingSession (Entity Class & DB Table)
Field	Description
id	Auto-generated ID (Primary Key)
userId	ID of the user
distanceInKm	Calculated distance (e.g., 0.52)
duration	Jog duration (e.g., 00:05:20)
startTime	When jog started (ISO string)
endTime	When jog ended
pathJson	Full GPS path (lat/lng array as JSON string)

✅ 5. 🔌 API Endpoints
Method	URL	Purpose
POST	/api/jog/save	Save a new jogging session
GET	/api/jog/all	Get all past sessions

✅ 6. 🔍 Web APIs Used
API	Purpose
Geolocation API	Track user’s location while jogging
Canvas API	Draw live jog path in browser
Network Info API	Show if user is on 4G/WiFi + speed

✅ 7. 🧪 Testing Tips
Test on a mobile browser for accurate GPS

Use browser console (F12) to debug JavaScript

Use Postman to test backend /api/jog/all

Check PostgreSQL to confirm data is saved

