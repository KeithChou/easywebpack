const Person = require('./Person.js')
const Life = require('./Life.js')

const person = new Person('kk', 'fe')

console.error('person', person.getPerson())
console.error('life', person.getLife())


exports.Person = Person
exports.Life = Life
