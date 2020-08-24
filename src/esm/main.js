import Person from './Person.js'
import Life from './Life.js'

const person = new Person('kk', 'fe')

console.error('person', person.getPerson())
console.error('life', person.getLife())

export {
    Life
}
