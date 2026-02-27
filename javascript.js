let expr = [];

const opRegex = /[+|\-|*|/]/;

const SYMBOL_TABLE = {
    clear: "clear",
    backspace: "back",
    neg: '-',

    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,

    plus: '+',
    minus: '-',
    times: '*',
    slash: '/',
    equals: '=',
}

const allButtons = document.querySelector(".all-buttons");

allButtons.addEventListener('click', e => buildExpression(e));

function buildExpression(event) {
    let button = SYMBOL_TABLE[event.target.id];
    if (button === undefined) {
        return;
    }

    switch (button) {
        case "clear":
            console.log("some clear function");
            return;
        case "back": 
            console.log("some back function");
            return;
    }

    if (opRegex.test(expr.at(-1)) && opRegex.test(button)) {
        expr.pop();
    }
    else if (expr.some(item => opRegex.test(item)) && isNaN(button)) {
        console.log("send to evaluation");
        if (button === '=')
            return;
    }

    expr.push(button);
    console.log(expr);
}


function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function evaluate(x, y, op) {
    switch (op) {
        case "+":
            return add(x, y);
        case "-":
            return subtract(x, y);
        case "*":
            return multiply(x, y);
        case "/":
            return divide(x, y);
    }
}

/*
So we have four basic operation functions and a master
function to evaluate to one of them...

What else?

Okay first I'll deal with the HTML
*/

/* 
HTML kinda done

Decimal, backspace, and keyboard functionality LATER.

So we need to add an event listener that listens for 
clicks on each number or operator button.

We then need to continuously add that to an array,
checking for whether or not it has an operator already
or not. 
If a full expression has been inputted and an 
operator is already present, then evaluate the full
expression first and append the operator to the result.
If not a full operation, then replace the current
operator.

How to evaluate an expression:
We have an array: ['1', '17', '+', '4', '5']
Join it into a string: "117+45"
Split it by operator (regex so operator is included):
["117", "+", "45"]
Then pass each element of the array to evaluate.

How to listen for buttons:
Attach a listener for clicks to all-buttons and
get the target. Compare the id to an object
that holds key: value pairs for numbers and
operations.

*/