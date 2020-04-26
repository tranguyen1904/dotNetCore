
const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  previousOperator: null,
};

const display = document.querySelector('input.calculator-screen');

function updateDisplay() {
  display.value = calculator.displayValue;
}

updateDisplay();


const keys = document.querySelector('.calculator-keys');

keys.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('operator')) {
    setPressState(target);
    handleOperator(target);
    updateDisplay();
    return;
  }

  if (target.classList.contains('btn-decimal')) {
    addDecimal();
    updateDisplay();
    return;
  }

  if (target.classList.contains('btn-clear')) {
    resetCalculator();
    updateDisplay();
    return;
  }

  addNumber(target.value);
  updateDisplay();
});

function addNumber(value){
  if (calculator.displayValue!='0' && calculator.waitingForSecondOperand==false){
    calculator.displayValue += value;
  } else{
    calculator.displayValue = value;
    calculator.waitingForSecondOperand = false;
  }
}

function addDecimal(){
  if (!calculator.displayValue.includes('.')){
    calculator.displayValue += '.';
  }
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  if (calculator.previousOperator!=null){
    if (calculator.previousOperator.classList.contains('is-pressed'))
      calculator.previousOperator.classList.remove('is-pressed');
    calculator.previousOperator = null;
  }
}

function setPressState(target){
  if (calculator.previousOperator!=null && calculator.previousOperator.classList.contains('is-pressed'))
    calculator.previousOperator.classList.remove('is-pressed');
  if (target.value!='=')
    target.classList.add('is-pressed');
}

function handleOperator(target){
  var inputValue = parseFloat(calculator.displayValue);
  if (calculator.waitingForSecondOperand){
    calculator.previousOperator = target;
    return;
  }
  if (calculator.firstOperand==null){
    calculator.firstOperand = inputValue;
  } else{
    var result = calculate(calculator.firstOperand, calculator.previousOperator.value, inputValue);
    if (!isFinite(result)){
      result = 0;
      calculator.displayValue = 'Error';
    } else {
      calculator.displayValue = String(result);
    }
    calculator.firstOperand = result;
  }
  calculator.waitingForSecondOperand = true;
  calculator.previousOperator = target;
}

function calculate(firstOperand, operator, secondOperand){
  switch(operator){
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