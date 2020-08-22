import { Life } from './Life.js'

class Person {
    constructor (name = '', job = '') {
        this.name = name
        this.job = job
    }
    getPerson () {
        console.log(`This is ${this.name}, My job is ${this.job}`)
        return {
            name: this.name,
            job: this.job
        }
    }
    getLife () {
        const life = new Life('Shen Zhen', 'sun')
        return life.getLife()
    }
}

export default Person
