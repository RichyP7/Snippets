const Request = require('request');
const hostUrl = "http://localhost:3000";

// Wir holen uns den Namen von der Kommandozeile
let user = '';
if (process.argv.length < 3) {
    console.log("Starten Sie das Programm als 'npm run listEvents <Personen-Name>'");
    // wir nehmen code=0, weil sonst die lange npm-Fehlermeldung zu Verwirrung führen könnte
    process.exit(0);
} else {
    user = process.argv[2];
}

Request.get(hostUrl + '/users/?name=' + user, userResponse);

function userResponse(error, response, body) {
    let users = JSON.parse(body);
    if (users.length === 0) {
        console.log('Keine Person mit diesem Namen gefunden.');
        process.exit(0);
    }
    let user = users[0]; // wir nehmen nur erstes Element aus Array
    Request.get(hostUrl + '/events/?participant=' + user.$loki, eventResponse);
}

function eventResponse(error, response, body) {
    let events = JSON.parse(body);
    events.sort(compareEventTime).map(printEvent);
}

// Hilfsfunktion zum Sortieren nach Uhrzeit
function compareEventTime(ev1, ev2) {
    let time1 = Date.parse(ev1.startTime);
    let time2 = Date.parse(ev2.startTime);
    return (time1 - time2);
}

// Hilfsfunktion zur Ausgabe eines Events
function printEvent(event) {
    console.log(event.startTime + " - " + event.name + " @ " + event.place);
}
