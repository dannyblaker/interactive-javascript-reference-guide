// JavaScript Features Database
const jsFeatures = [
    // Variables & Data Types
    {
        id: 'var-let-const',
        category: 'Variables',
        title: 'Variable Declarations (var, let, const)',
        description: 'JavaScript has three ways to declare variables: var (function-scoped), let (block-scoped), and const (block-scoped, immutable binding).',
        code: `// var - function scoped, can be redeclared
var x = 1;
var x = 2; // OK
console.log(x); // 2

// let - block scoped, cannot be redeclared
let y = 1;
// let y = 2; // Error!
y = 2; // OK
console.log(y); // 2

// const - block scoped, cannot be reassigned
const z = 1;
// z = 2; // Error!
console.log(z); // 1

// const with objects (properties can change)
const obj = { name: 'John' };
obj.name = 'Jane'; // OK
console.log(obj.name); // Jane`,
        output: `2
2
1
Jane`,
        notes: [
            'Prefer const by default, use let when you need to reassign',
            'Avoid var in modern JavaScript',
            'const prevents reassignment, not immutability of objects'
        ]
    },
    {
        id: 'data-types',
        category: 'Data Types',
        title: 'Primitive Data Types',
        description: 'JavaScript has 7 primitive types: string, number, bigint, boolean, undefined, null, and symbol.',
        code: `// String
const str = "Hello World";
console.log(typeof str); // string

// Number
const num = 42;
const float = 3.14;
console.log(typeof num); // number

// BigInt (for large integers)
const big = 9007199254740991n;
console.log(typeof big); // bigint

// Boolean
const isTrue = true;
console.log(typeof isTrue); // boolean

// Undefined
let notDefined;
console.log(typeof notDefined); // undefined

// Null
const empty = null;
console.log(typeof empty); // object (historical bug)

// Symbol (unique identifier)
const sym = Symbol('description');
console.log(typeof sym); // symbol`,
        output: `string
number
bigint
boolean
undefined
object
symbol`,
        notes: [
            'typeof null returns "object" due to a historical JavaScript bug',
            'Symbols are always unique, even with same description',
            'Use BigInt for integers larger than Number.MAX_SAFE_INTEGER'
        ]
    },

    // Functions
    {
        id: 'arrow-functions',
        category: 'Functions',
        title: 'Arrow Functions',
        description: 'Arrow functions provide a concise syntax and lexically bind the this value.',
        code: `// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function
const addArrow = (a, b) => a + b;

// Arrow function with single parameter
const square = x => x * x;

// Arrow function with multiple statements
const greet = name => {
    const greeting = \`Hello, \${name}!\`;
    return greeting;
};

console.log(add(2, 3));        // 5
console.log(addArrow(2, 3));   // 5
console.log(square(4));        // 16
console.log(greet('Alice'));   // Hello, Alice!

// Lexical this binding
const obj = {
    value: 10,
    traditional: function() {
        setTimeout(function() {
            // 'this' is not obj here
            console.log(this.value); // undefined
        }, 100);
    },
    arrow: function() {
        setTimeout(() => {
            // 'this' is obj here
            console.log(this.value); // 10
        }, 100);
    }
};`,
        output: `5
5
16
Hello, Alice!`,
        notes: [
            'Arrow functions do not have their own this binding',
            'Cannot be used as constructors',
            'No arguments object in arrow functions'
        ]
    },
    {
        id: 'default-params',
        category: 'Functions',
        title: 'Default Parameters',
        description: 'Functions can have default parameter values that are used when no argument is provided.',
        code: `// Default parameters
function greet(name = 'Guest', greeting = 'Hello') {
    return \`\${greeting}, \${name}!\`;
}

console.log(greet());                    // Hello, Guest!
console.log(greet('Alice'));             // Hello, Alice!
console.log(greet('Bob', 'Hi'));         // Hi, Bob!

// Default can be expressions
function createUser(name, id = Date.now()) {
    return { name, id };
}

console.log(createUser('Alice'));
// { name: 'Alice', id: 1699234567890 }

// Using previous parameters
function multiply(a, b = a * 2) {
    return a * b;
}

console.log(multiply(5));     // 25 (5 * 10)
console.log(multiply(5, 3));  // 15`,
        output: `Hello, Guest!
Hello, Alice!
Hi, Bob!
{ name: 'Alice', id: 1699234567890 }
25
15`,
        notes: [
            'Default values are evaluated at call time',
            'Can use previous parameters in default expressions',
            'undefined triggers default, but null does not'
        ]
    },
    {
        id: 'rest-spread',
        category: 'Functions',
        title: 'Rest & Spread Operators',
        description: 'Rest (...) collects multiple elements into an array. Spread (...) expands an array into individual elements.',
        code: `// Rest parameters - collect arguments
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4));  // 10

// Spread operator - expand array
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined);  // [1, 2, 3, 4, 5, 6]

// Spread with objects
const user = { name: 'Alice', age: 30 };
const updatedUser = { ...user, age: 31, city: 'NYC' };
console.log(updatedUser);
// { name: 'Alice', age: 31, city: 'NYC' }

// Copy arrays/objects
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original);  // [1, 2, 3]
console.log(copy);      // [1, 2, 3, 4]`,
        output: `10
[1, 2, 3, 4, 5, 6]
{ name: 'Alice', age: 31, city: 'NYC' }
[1, 2, 3]
[1, 2, 3, 4]`,
        notes: [
            'Rest must be the last parameter',
            'Spread creates shallow copies',
            'Later properties override earlier ones in object spread'
        ]
    },

    // Arrays
    {
        id: 'array-methods',
        category: 'Arrays',
        title: 'Array Methods (map, filter, reduce)',
        description: 'Powerful array methods for transforming and processing data functionally.',
        code: `const numbers = [1, 2, 3, 4, 5, 6];

// map - transform each element
const doubled = numbers.map(n => n * 2);
console.log(doubled);  // [2, 4, 6, 8, 10, 12]

// filter - keep elements that match condition
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);    // [2, 4, 6]

// reduce - accumulate to single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum);      // 21

// Chaining methods
const result = numbers
    .filter(n => n > 2)
    .map(n => n * n)
    .reduce((acc, n) => acc + n, 0);
console.log(result);   // 86 (3²+4²+5²+6²)

// find - get first match
const firstEven = numbers.find(n => n % 2 === 0);
console.log(firstEven);  // 2

// some/every - test conditions
const hasEven = numbers.some(n => n % 2 === 0);
const allPositive = numbers.every(n => n > 0);
console.log(hasEven, allPositive);  // true true`,
        output: `[2, 4, 6, 8, 10, 12]
[2, 4, 6]
21
86
2
true true`,
        notes: [
            'These methods do not mutate the original array',
            'reduce is the most powerful but can be harder to read',
            'Use find instead of filter when you need just one element'
        ]
    },
    {
        id: 'destructuring-arrays',
        category: 'Arrays',
        title: 'Array Destructuring',
        description: 'Extract values from arrays into distinct variables using concise syntax.',
        code: `// Basic destructuring
const colors = ['red', 'green', 'blue'];
const [first, second, third] = colors;
console.log(first, second, third);  // red green blue

// Skip elements
const [primary, , tertiary] = colors;
console.log(primary, tertiary);  // red blue

// Rest in destructuring
const numbers = [1, 2, 3, 4, 5];
const [one, two, ...rest] = numbers;
console.log(one, two, rest);  // 1 2 [3, 4, 5]

// Default values
const [a, b, c = 'default'] = ['x', 'y'];
console.log(a, b, c);  // x y default

// Swapping variables
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y);  // 2 1

// Nested destructuring
const nested = [1, [2, 3], 4];
const [first2, [second2, third2]] = nested;
console.log(first2, second2, third2);  // 1 2 3`,
        output: `red green blue
red blue
1 2 [3, 4, 5]
x y default
2 1
1 2 3`,
        notes: [
            'Destructuring assignment evaluates right side first',
            'Great for swapping variables without temp variable',
            'Can destructure function return values'
        ]
    },

    // Objects
    {
        id: 'object-literals',
        category: 'Objects',
        title: 'Enhanced Object Literals',
        description: 'ES6+ enhancements for creating objects with shorthand syntax and computed properties.',
        code: `const name = 'Alice';
const age = 30;

// Property shorthand
const user = { name, age };
console.log(user);  // { name: 'Alice', age: 30 }

// Method shorthand
const calculator = {
    add(a, b) { return a + b; },
    subtract(a, b) { return a - b; }
};
console.log(calculator.add(5, 3));  // 8

// Computed property names
const prop = 'dynamicKey';
const obj = {
    [prop]: 'value',
    ['key' + '2']: 'another value'
};
console.log(obj);
// { dynamicKey: 'value', key2: 'another value' }

// Combining features
const id = 1;
const createUser = (name, age) => ({
    id,
    name,
    age,
    greet() {
        return \`Hi, I'm \${this.name}\`;
    }
});

const alice = createUser('Alice', 30);
console.log(alice.greet());  // Hi, I'm Alice`,
        output: `{ name: 'Alice', age: 30 }
8
{ dynamicKey: 'value', key2: 'another value' }
Hi, I'm Alice`,
        notes: [
            'Property shorthand when variable name matches property name',
            'Method shorthand is more concise than function expressions',
            'Computed properties evaluated at object creation time'
        ]
    },
    {
        id: 'destructuring-objects',
        category: 'Objects',
        title: 'Object Destructuring',
        description: 'Extract object properties into variables with optional renaming and defaults.',
        code: `const user = {
    name: 'Alice',
    age: 30,
    email: 'alice@example.com'
};

// Basic destructuring
const { name, age } = user;
console.log(name, age);  // Alice 30

// Renaming variables
const { name: userName, age: userAge } = user;
console.log(userName, userAge);  // Alice 30

// Default values
const { city = 'Unknown' } = user;
console.log(city);  // Unknown

// Nested destructuring
const person = {
    name: 'Bob',
    address: {
        city: 'NYC',
        country: 'USA'
    }
};

const { address: { city: userCity } } = person;
console.log(userCity);  // NYC

// Function parameters
function greet({ name, age = 18 }) {
    return \`\${name} is \${age} years old\`;
}

console.log(greet({ name: 'Charlie', age: 25 }));
console.log(greet({ name: 'Diana' }));`,
        output: `Alice 30
Alice 30
Unknown
NYC
Charlie is 25 years old
Diana is 18 years old`,
        notes: [
            'Order does not matter in object destructuring',
            'Can combine renaming and default values',
            'Very useful for function parameters'
        ]
    },
    {
        id: 'optional-chaining',
        category: 'Objects',
        title: 'Optional Chaining (?.)',
        description: 'Safely access nested properties without checking each level for null/undefined.',
        code: `const user = {
    name: 'Alice',
    address: {
        city: 'NYC'
    }
};

// Without optional chaining (risky!)
// console.log(user.profile.bio); // Error!

// With optional chaining
console.log(user.profile?.bio);  // undefined
console.log(user.address?.city); // NYC
console.log(user.address?.zipCode);  // undefined

// Optional chaining with methods
const obj = {
    method: () => 'Hello'
};

console.log(obj.method?.());      // Hello
console.log(obj.otherMethod?.()); // undefined

// Optional chaining with arrays
const data = {
    items: [1, 2, 3]
};

console.log(data.items?.[0]);     // 1
console.log(data.other?.[0]);     // undefined

// Combining with nullish coalescing
const username = user.profile?.name ?? 'Guest';
console.log(username);  // Guest`,
        output: `undefined
NYC
undefined
Hello
undefined
1
undefined
Guest`,
        notes: [
            'Returns undefined if any part of chain is null/undefined',
            'Works with properties, methods, and array indices',
            'Short-circuits evaluation (stops at first null/undefined)'
        ]
    },

    // Template Literals
    {
        id: 'template-literals',
        category: 'Strings',
        title: 'Template Literals',
        description: 'String literals with embedded expressions, multi-line support, and tagged templates.',
        code: `const name = 'Alice';
const age = 30;

// Basic interpolation
const greeting = \`Hello, \${name}!\`;
console.log(greeting);  // Hello, Alice!

// Expressions in templates
const message = \`Next year, \${name} will be \${age + 1}\`;
console.log(message);  // Next year, Alice will be 31

// Multi-line strings
const multiline = \`
    This is a
    multi-line
    string
\`;
console.log(multiline);

// Tagged templates
function highlight(strings, ...values) {
    return strings.reduce((result, str, i) => {
        return result + str + (values[i] ? \`<b>\${values[i]}</b>\` : '');
    }, '');
}

const highlighted = highlight\`Name: \${name}, Age: \${age}\`;
console.log(highlighted);
// Name: <b>Alice</b>, Age: <b>30</b>

// Raw strings
const path = String.raw\`C:\\Users\\Alice\\Documents\`;
console.log(path);  // C:\\Users\\Alice\\Documents`,
        output: `Hello, Alice!
Next year, Alice will be 31

    This is a
    multi-line
    string

Name: <b>Alice</b>, Age: <b>30</b>
C:\\Users\\Alice\\Documents`,
        notes: [
            'Template literals use backticks (`), not quotes',
            'Can embed any JavaScript expression inside ${}',
            'Tagged templates allow custom string processing'
        ]
    },

    // Promises & Async
    {
        id: 'promises',
        category: 'Async',
        title: 'Promises',
        description: 'Handle asynchronous operations with promises, avoiding callback hell.',
        code: `// Creating a promise
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true;
            if (success) {
                resolve({ data: 'Hello World' });
            } else {
                reject(new Error('Failed to fetch'));
            }
        }, 1000);
    });
};

// Using promises
fetchData()
    .then(result => {
        console.log('Success:', result.data);
        return result.data.toUpperCase();
    })
    .then(upperData => {
        console.log('Uppercase:', upperData);
    })
    .catch(error => {
        console.error('Error:', error.message);
    })
    .finally(() => {
        console.log('Operation complete');
    });

// Promise.all - wait for all
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3])
    .then(values => {
        console.log('All resolved:', values);
    });

// Promise.race - first to complete
Promise.race([p1, p2, p3])
    .then(value => {
        console.log('First resolved:', value);
    });`,
        output: `Success: Hello World
Uppercase: HELLO WORLD
Operation complete
All resolved: [1, 2, 3]
First resolved: 1`,
        notes: [
            'Promises are eager (execute immediately)',
            'then() returns a new promise (chainable)',
            'catch() handles any error in the chain'
        ]
    },
    {
        id: 'async-await',
        category: 'Async',
        title: 'Async/Await',
        description: 'Write asynchronous code that looks synchronous using async/await syntax.',
        code: `// Async function returns a promise
async function fetchUser(id) {
    return { id, name: 'Alice' };
}

// Await pauses execution until promise resolves
async function getUser() {
    const user = await fetchUser(1);
    console.log(user);
    return user;
}

getUser();  // { id: 1, name: 'Alice' }

// Error handling with try/catch
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Parallel execution
async function fetchMultiple() {
    const [user, posts, comments] = await Promise.all([
        fetchUser(1),
        fetchPosts(1),
        fetchComments(1)
    ]);
    
    console.log({ user, posts, comments });
}

// Top-level await (in modules)
// const data = await fetchData();

// Async IIFE
(async () => {
    const result = await fetchUser(1);
    console.log('IIFE result:', result);
})();`,
        output: `{ id: 1, name: 'Alice' }
IIFE result: { id: 1, name: 'Alice' }`,
        notes: [
            'await can only be used inside async functions',
            'async functions always return a promise',
            'Use Promise.all for parallel async operations'
        ]
    },

    // Classes
    {
        id: 'classes',
        category: 'Classes',
        title: 'ES6 Classes',
        description: 'Object-oriented programming with class syntax, constructors, and methods.',
        code: `// Class declaration
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    // Method
    greet() {
        return \`Hi, I'm \${this.name}\`;
    }
    
    // Getter
    get birthYear() {
        return new Date().getFullYear() - this.age;
    }
    
    // Setter
    set birthYear(year) {
        this.age = new Date().getFullYear() - year;
    }
    
    // Static method
    static create(name, age) {
        return new Person(name, age);
    }
}

const alice = new Person('Alice', 30);
console.log(alice.greet());      // Hi, I'm Alice
console.log(alice.birthYear);    // 1995

// Inheritance
class Student extends Person {
    constructor(name, age, grade) {
        super(name, age);  // Call parent constructor
        this.grade = grade;
    }
    
    greet() {
        return \`\${super.greet()}, I'm a student\`;
    }
}

const bob = new Student('Bob', 20, 'A');
console.log(bob.greet());  // Hi, I'm Bob, I'm a student`,
        output: `Hi, I'm Alice
1995
Hi, I'm Bob, I'm a student`,
        notes: [
            'Classes are syntactic sugar over prototypes',
            'constructor is called when creating instances',
            'super() must be called before using this in child classes'
        ]
    },
    {
        id: 'class-fields',
        category: 'Classes',
        title: 'Class Fields & Private Members',
        description: 'Public and private class fields with modern class syntax.',
        code: `class Counter {
    // Public field
    count = 0;
    
    // Private field (ES2022)
    #maxCount = 100;
    
    // Private method
    #validate(value) {
        return value >= 0 && value <= this.#maxCount;
    }
    
    increment() {
        if (this.#validate(this.count + 1)) {
            this.count++;
        }
    }
    
    // Public method accessing private
    getMax() {
        return this.#maxCount;
    }
}

const counter = new Counter();
console.log(counter.count);      // 0
counter.increment();
console.log(counter.count);      // 1
console.log(counter.getMax());   // 100

// console.log(counter.#maxCount);  // Error!

// Static fields and methods
class Config {
    static #apiKey = 'secret-key';
    static version = '1.0.0';
    
    static getApiKey() {
        return this.#apiKey;
    }
}

console.log(Config.version);     // 1.0.0
console.log(Config.getApiKey()); // secret-key`,
        output: `0
1
100
1.0.0
secret-key`,
        notes: [
            'Private fields start with # and are truly private',
            'Static members belong to the class, not instances',
            'Private fields must be declared in class body'
        ]
    },

    // Modules
    {
        id: 'modules',
        category: 'Modules',
        title: 'ES6 Modules (import/export)',
        description: 'Organize code into reusable modules with import and export.',
        code: `// ===== math.js =====
// Named exports
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export class Calculator {
    multiply(a, b) {
        return a * b;
    }
}

// Default export
export default function subtract(a, b) {
    return a - b;
}

// ===== app.js =====
// Import default export
import subtract from './math.js';

// Import named exports
import { PI, add, Calculator } from './math.js';

// Import with alias
import { add as sum } from './math.js';

// Import everything
import * as Math from './math.js';

console.log(PI);              // 3.14159
console.log(add(5, 3));       // 8
console.log(subtract(5, 3));  // 2
console.log(Math.PI);         // 3.14159

// Re-export
// export { add, subtract } from './math.js';
// export * from './math.js';`,
        output: `3.14159
8
2
3.14159`,
        notes: [
            'Each module has its own scope',
            'Imports are hoisted to top of file',
            'Dynamic imports: import("./module.js").then(...)'
        ]
    },

    // Iterators & Generators
    {
        id: 'generators',
        category: 'Iterators',
        title: 'Generators',
        description: 'Functions that can pause execution and yield multiple values.',
        code: `// Generator function
function* countUp() {
    yield 1;
    yield 2;
    yield 3;
}

const gen = countUp();
console.log(gen.next());  // { value: 1, done: false }
console.log(gen.next());  // { value: 2, done: false }
console.log(gen.next());  // { value: 3, done: false }
console.log(gen.next());  // { value: undefined, done: true }

// Infinite generator
function* fibonacci() {
    let [a, b] = [0, 1];
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

const fib = fibonacci();
console.log(fib.next().value);  // 0
console.log(fib.next().value);  // 1
console.log(fib.next().value);  // 1
console.log(fib.next().value);  // 2
console.log(fib.next().value);  // 3

// Using generators with for...of
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

for (const num of range(1, 5)) {
    console.log(num);  // 1, 2, 3, 4, 5
}`,
        output: `{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: undefined, done: true }
0
1
1
2
3
1
2
3
4
5`,
        notes: [
            'Generators are lazy - values computed on demand',
            'Can create infinite sequences',
            'Useful for iterating over large datasets'
        ]
    },

    // Symbols & Maps
    {
        id: 'map-set',
        category: 'Collections',
        title: 'Map and Set',
        description: 'New collection types: Map for key-value pairs, Set for unique values.',
        code: `// Map - key-value pairs with any type as key
const map = new Map();

map.set('name', 'Alice');
map.set(1, 'one');
map.set(true, 'boolean');

console.log(map.get('name'));   // Alice
console.log(map.has(1));        // true
console.log(map.size);          // 3

// Iterating Map
for (const [key, value] of map) {
    console.log(\`\${key}: \${value}\`);
}

map.delete(1);
console.log(map.size);  // 2

// Set - unique values
const set = new Set([1, 2, 3, 3, 4, 4, 5]);
console.log(set);       // Set { 1, 2, 3, 4, 5 }
console.log(set.size);  // 5

set.add(6);
set.add(3);  // No effect (already exists)
console.log(set.has(3)); // true

// Convert to array
const arr = [...set];
console.log(arr);  // [1, 2, 3, 4, 5, 6]

// WeakMap and WeakSet (keys are weakly referenced)
const weakMap = new WeakMap();
let obj = { id: 1 };
weakMap.set(obj, 'data');`,
        output: `Alice
true
3
name: Alice
1: one
true: boolean
2
Set { 1, 2, 3, 4, 5 }
5
true
[1, 2, 3, 4, 5, 6]`,
        notes: [
            'Map preserves insertion order',
            'Map keys can be any type (objects, functions, etc.)',
            'WeakMap/WeakSet allow garbage collection of keys'
        ]
    },

    // Proxy & Reflect
    {
        id: 'proxy',
        category: 'Metaprogramming',
        title: 'Proxy',
        description: 'Intercept and customize operations on objects.',
        code: `// Basic proxy
const target = {
    message: 'Hello'
};

const handler = {
    get(obj, prop) {
        console.log(\`Getting \${prop}\`);
        return prop in obj ? obj[prop] : 'Not found';
    },
    set(obj, prop, value) {
        console.log(\`Setting \${prop} to \${value}\`);
        obj[prop] = value;
        return true;
    }
};

const proxy = new Proxy(target, handler);

console.log(proxy.message);     // Hello
console.log(proxy.nonexistent); // Not found
proxy.message = 'Hi';

// Validation proxy
const validator = {
    set(obj, prop, value) {
        if (prop === 'age') {
            if (typeof value !== 'number') {
                throw new TypeError('Age must be a number');
            }
            if (value < 0) {
                throw new RangeError('Age must be positive');
            }
        }
        obj[prop] = value;
        return true;
    }
};

const person = new Proxy({}, validator);
person.age = 30;  // OK
console.log(person.age);  // 30
// person.age = -1;  // Error: Age must be positive`,
        output: `Getting message
Hello
Getting nonexistent
Not found
Setting message to Hi
30`,
        notes: [
            'Proxies can intercept 13 different operations',
            'Useful for validation, logging, and data binding',
            'Reflect API provides default behavior for proxy traps'
        ]
    },

    // Error Handling
    {
        id: 'error-handling',
        category: 'Error Handling',
        title: 'Try/Catch & Custom Errors',
        description: 'Handle errors gracefully with try/catch and create custom error types.',
        code: `// Basic try/catch
function divide(a, b) {
    try {
        if (b === 0) {
            throw new Error('Division by zero');
        }
        return a / b;
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    } finally {
        console.log('Division attempted');
    }
}

console.log(divide(10, 2));  // 5
console.log(divide(10, 0));  // null

// Custom error class
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

function validateAge(age) {
    if (age < 0) {
        throw new ValidationError('Age cannot be negative');
    }
    if (age > 150) {
        throw new ValidationError('Age is unrealistic');
    }
    return true;
}

try {
    validateAge(-5);
} catch (error) {
    if (error instanceof ValidationError) {
        console.log('Validation failed:', error.message);
    } else {
        console.log('Unknown error:', error);
    }
}`,
        output: `5
Division attempted
Error: Division by zero
null
Division attempted
Validation failed: Age cannot be negative`,
        notes: [
            'finally block always executes',
            'Custom errors help identify error types',
            'Use instanceof to check error type'
        ]
    },

    // Nullish Coalescing
    {
        id: 'nullish-coalescing',
        category: 'Operators',
        title: 'Nullish Coalescing (??)',
        description: 'Provide default values only for null or undefined, not other falsy values.',
        code: `// Nullish coalescing vs OR operator
const value1 = null ?? 'default';
const value2 = undefined ?? 'default';
const value3 = 0 ?? 'default';
const value4 = '' ?? 'default';
const value5 = false ?? 'default';

console.log(value1);  // default
console.log(value2);  // default
console.log(value3);  // 0
console.log(value4);  // ''
console.log(value5);  // false

// Compare with OR operator
const or1 = null || 'default';
const or2 = 0 || 'default';
const or3 = '' || 'default';

console.log(or1);  // default
console.log(or2);  // default (different!)
console.log(or3);  // default (different!)

// Practical use case
function getPort(config) {
    // 0 is a valid port, so ?? is better than ||
    return config.port ?? 8080;
}

console.log(getPort({ port: 0 }));     // 0
console.log(getPort({ port: 3000 }));  // 3000
console.log(getPort({}));              // 8080`,
        output: `default
default
0

false
default
default
default
0
3000
8080`,
        notes: [
            '?? only checks for null/undefined',
            '|| checks for any falsy value (0, "", false, etc.)',
            'Use ?? when 0, "", or false are valid values'
        ]
    }
];
