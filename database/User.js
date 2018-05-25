class User {
    constructor(name) {
        this.name = name;
        this.calendars = [];
    }

    addCalendar(calendar) {
        this.calendars.push(calendar);
    }

    /**
     * Wir haben eine eigene Funktion, die beim Serialisieren als JSON
     * für die Kalender Referenzen retourniert (nur ID, nicht volle URL).
     */
    toJSON() {
        let user = {
            $loki: this.$loki,
            name: this.name,
            calendars: []
        };
        for (let calendar of this.calendars) {
            user.calendars.push(calendar.$loki);
        }
        return user;
    }
}

module.exports = User;