// Button values
const buttons = [
  '7', '8', '9', '/',
  '4', '5', '6', '*',
  '1', '2', '3', '-',
  '0', '.', '=', '+',
  'C'
];

const display = document.getElementById('display');
const grid = document.querySelector('.button-grid');

// Create buttons dynamically
buttons.forEach(value => {
  const button = document.createElement('button');
  button.innerText = value;

  if (['+', '-', '*', '/'].includes(value)) {
    button.classList.add('operator');
  } else if (value === '=') {
    button.classList.add('equal');
  } else if (value === 'C') {
    button.classList.add('clear');
  }

  button.addEventListener('click', () => handleClick(value));
  grid.appendChild(button);
});

let currentInput = '';
let resultDisplayed = false;

// Handle button clicks
function handleClick(value) {
  if (value === 'C') {
    clearDisplay();
  } else if (value === '=') {
    calculateResult();
  } else {
    if (resultDisplayed && !['+', '-', '*', '/'].includes(value)) {
      currentInput = '';
    }
    currentInput += value;
    display.innerText = currentInput;
    resultDisplayed = false;
  }
}

function clearDisplay() {
  currentInput = '';
  display.innerText = '0';
}

function calculateResult() {
  try {
    // Validate expression before eval
    if (isValid(currentInput)) {
      const result = eval(currentInput);
      display.innerText = result;
      currentInput = result.toString();
      resultDisplayed = true;
    } else {
      display.innerText = 'Error';
    }
  } catch (e) {
    display.innerText = 'Error';
  }
}

// Basic validation (optional)
function isValid(expr) {
  const allowed = /^[0-9+\-*/.]+$/;
  return allowed.test(expr);
}
