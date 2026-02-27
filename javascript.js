const allButtons = document.querySelector(".all-buttons");
const display = document.querySelector("#output");
const opRegex = /([+|\-|*|/])/;
const SYMBOL_TABLE = {
    clear: "clear",
    backspace: "back",
    neg: '-',
    dec: '.',

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

let expr = [];
let justEvaluated = false;

allButtons.addEventListener('click', e => updateExpression(e));

function updateExpression(event) {
    console.log(event.target);
    let button = SYMBOL_TABLE[event.target.id];
    let type = event.target.className;

    switch (button) {
        case undefined:
            return;
        case "clear":
            expr = [];
            updateDisplay();
            return;
        case "back": 
            expr.pop();
            updateDisplay();
            return;
            
    }

    // If it's only one number and an operator
    let singleNumber = opRegex.test(expr.at(-1));

    // Replace operator if pressing operators consecutively
    if (singleNumber && opRegex.test(button)) {
        expr.pop(); 
    }
    else if (expr.some(item => opRegex.test(item)) && !singleNumber && type === "op") {
        justEvaluated = true;
        expr = [evaluateExpression(expr)];
    }
    else if (justEvaluated && type === "num") {
        expr = [];
    }
    else if (button === 0 && !expr.length) {
        return;
    }

    if (button === '=') {
        updateDisplay();
        return;
    }

    justEvaluated = false;
    
    expr.push(button);
    updateDisplay();
}

function updateDisplay () {
    if (!expr.length) {
        display.textContent = "0";
        return;
    }

    let toDisplay = expr.join('').split(opRegex).join(' ');
    display.textContent = toDisplay;
}

function evaluateExpression(arr) {
    let expression = arr.join('').split(opRegex);
    let [num1, op, num2] = [+expression[0], expression[1], +expression[2]];
    return operateExpression(num1, num2, op);
}


function operateExpression(x, y, op) {
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