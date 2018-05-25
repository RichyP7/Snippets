class Calendar {
    constructor(name, owner) {
        this.name = name;
        this.owner = owner;
    }

    /**
     * Wir haben eine eigene Funktion, die beim Serialisieren als JSON
     * für die Kalender Referenzen retourniert (nur ID, nicht volle URL).
     */
    toJSON() {
        return {
            $loki: this.$loki,
            name: this.name,
            owner: this.owner.$loki
        }
    }
}

module.exports = Calendar;