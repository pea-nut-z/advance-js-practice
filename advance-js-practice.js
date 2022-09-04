console.log("CURRYING");
// transforms and not returning
function sum(a, b, c) {
  return a + b + c;
}

function curry(fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return fn(a, b, c);
      };
    };
  };
}

const curriedSum = curry(sum);
console.log(curriedSum(2)(3)(5));

const add2 = curriedSum(2);
const add3 = add2(3);
const add5 = add3(5);
console.log(add5);

console.log("THIS KEY WORD");
// order of precedence - new, explicit, implicit, default binding

// implicit
const person = {
  name: "Vishwas",
  sayMyName: function () {
    console.log(`My implicit name is ${this.name}`);
  },
};
person.sayMyName();

// explicit - Every func has .call method to declare context
function sayMyName() {
  console.log(`My explicit name is ${this.name}`);
}
sayMyName.call(person);

// new binding - this = {}  new key words creates a new empty obj
function Person(name) {
  this.name = name;
}
const p1 = new Person("pauline");
const p2 = new Person("jane");
// default - this refers to global variable globalThis.<objkey>

console.log("PHOTOTYPE");
function Person(fname, lname) {
  this.firstName = fname;
  this.lastName = lname;
}

const person1 = new Person("Bruce", "Wayne");
const person2 = new Person("Clark", "Kent");

person1.getFullName = function () {
  return this.firstName + " " + this.lastName;
};
console.log(person1.getFullName()); // specific; does not apply to person2

Person.prototype.getFullName = function () {
  return this.firstName + " " + this.lastName;
};
console.log(person2.getFullName()); // generic; applies to all

// Inherits from Person function
function SuperHero(fName, lName) {
  Person.call(this, fName.lName); // this now refers to SuperHero instead of Person
  this.isSuperHero = true;
}

SuperHero.prototype.fightCrime = function () {
  console.log("Fighting crime");
};

SuperHero.prototype = Object.create(Person.prototype); // inherits
const batman = new SuperHero("Bruce", "Wayne");
SuperHero.prototype.constructor = SuperHero; // needed otherwise js would think it is created from Person
console.log(batman.getFullName());

console.log("ITERABLES & ITERATORS");
const obj = {
  [Symbol.iterator]: function () {
    let step = 0;
    const iterator = {
      next: function () {
        step++;
        if (step === 1) {
          return { value: "hello", done: false };
        } else if (step === 2) {
          return { value: "world", done: false };
        }
        return { value: undefined, done: true };
      },
    };
    return iterator;
  },
};

for (const word of obj) {
  console.log(word);
}

console.log("GENEROTOR");
function* generator() {
  yield "hello";
  yield "world";
}

const generatorObj = generator();
for (const word of generatorObj) {
  console.log(word);
}
