let displayValue = '0';
let operator = '';
let firstOperand = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = displayValue;
}

function clearDisplay() {
    displayValue = '0';
    operator = '';
    firstOperand = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function appendNumber(number) {
    if (waitingForSecondOperand) {
        displayValue = number;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? number : displayValue + number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (waitingForSecondOperand) return;
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}

function setOperator(nextOperator) {
    if (firstOperand === null) {
        firstOperand = parseFloat(displayValue);
    } else if (operator) {
        const result = performCalculation();
        displayValue = result.toString();
        updateDisplay();
        firstOperand = result;
    }

    operator = nextOperator;
    waitingForSecondOperand = true;
}

function performCalculation() {
    const secondOperand = parseFloat(displayValue);
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            return firstOperand / secondOperand;
        default:
            return secondOperand;
    }
}

function calculate() {
    if (waitingForSecondOperand) return;
    displayValue = performCalculation().toString();
    operator = '';
    firstOperand = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

clearDisplay();  // Initialize the calculator displayValue