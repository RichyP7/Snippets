class Event {
    constructor(calendar, name, place, startTime, participants) {
        this.calendar = calendar;
        this.name = name;
        this.place = place;
        this.startTime = startTime;
        this.participants = participants;
    }

    /**
     * Wir haben eine eigene Funktion, die beim Serialisieren als JSON
     * für die Kalender und Personen Referenzen retourniert (nur ID, nicht volle URL).
     */
    toJSON() {
        let event = Object.assign({}, this);    // copy/clone
        event.meta = undefined;
        event.calendar = this.calendar.$loki;
        event.participants = [];
        for (let user of this.participants) {
            event.participants.push(user.$loki);
        }
        return event;
    }
}

module.exports = Event;