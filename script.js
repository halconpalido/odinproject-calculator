let displayValue = '';
let num1 = null;
let num2 = null;
let currentOperator = null;
let clearDisplay = true;

const display = document.getElementById('display');
const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.getElementById('clear');
const equalButton = document.getElementById('equal');

function updateDisplay(event) {
  if (clearDisplay) {
    display.textContent = event.target.textContent;
    clearDisplay = false;
  } else if (display.textContent.length == 8){
    display.textContent = display.textContent;
  } else {
    display.textContent += event.target.textContent;
  }
  displayValue = display.textContent;
}

function clearAll() {
    display.textContent = '0';
    num1 = null;
    num2 = null;
    currentOperator = null;
    clearDisplay = true;
}

function setOperator(event) {
    if (num1 !== null && currentOperator !== null) {
        num2 = parseFloat(display.textContent);
        num1 = operate(currentOperator, num1, num2);
        display.textContent = num1;
        num2 = null;
    } else {
        num1 = parseFloat(display.textContent);
    }
    currentOperator = event.target.id;
    clearDisplay = true;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case 'add':
            return add(num1, num2);
        case 'subtract':
            return subtract(num1, num2);
        case 'multiply':
            return multiply(num1, num2);
        case 'divide':
            return divide(num1, num2);
        default:
            return null;
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        clearAll();
        return 'NOPE';
    }
    return a / b;
}

digitButtons.forEach(button => {
    button.addEventListener('click', updateDisplay);
});

clearButton.addEventListener('click', clearAll);

operatorButtons.forEach(button => {
    button.addEventListener('click', setOperator);
});

equalButton.addEventListener('click', () => {
    if (!currentOperator || num1 === null) return; // If no operation is set or no first number, do nothing.
    num2 = parseFloat(display.textContent); // Parse the second number.
    let result = operate(currentOperator, num1, num2); // Perform the operation.
    
    if (result === 'NOPE') {
        display.textContent = result; // If dividing by zero, show error.
    } else if (result === 69){
        display.textContent = "69, NICE"
    } else if (result === 80085){
        display.textContent = "BOOBS"
    } 
    else if (result === 8008135){
        display.textContent = "BOOBIES"
    } else if (result === 101){
        display.textContent = "LOL"
    } else {
        // Convert to string to check length and round if necessary.
        let resultString = result.toString();
        if (resultString.length > 8) {
            // If the result is a float and too long, round it.
            if (result % 1 !== 0) {
                result = parseFloat(result.toFixed(2)); // Round to 2 decimal places.
                if (result.toString().length > 8) {
                    result = result.toPrecision(6); // If still too long, use precision.
                }
            } else {
                // If an integer and too long, use precision.
                result = Number(result).toPrecision(6);
            }
        }
        display.textContent = result.toString(); // Display the result.
    }

    // Reset the state for the next calculation.
    num1 = null;
    currentOperator = null;
    clearDisplay = true; // Set this to false if you want to continue with the current result.
});

