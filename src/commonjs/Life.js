class Life {
    constructor (live = '', weather = '') {
        this.live = live
        this.weather = weather
    }
    getLife () {
        return {
            live: this.live,
            weather: this.weather
        }
    }
}

exports.Life = Life
