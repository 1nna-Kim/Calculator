document.addEventListener('DOMContentLoaded', function () {
  const display = document.querySelector('.display');
  const buttons = document.querySelectorAll('.button');

  let currentOperation = null;
  let firstOperand = null;

  buttons.forEach(button => {
      button.addEventListener('click', function (e) {
          const buttonValue = e.target.innerText;
          const isOperation = ['+', '-', '*', '/'].includes(buttonValue);

          if (isOperation) {
              if (currentOperation === null) {
                  firstOperand = display.innerText;
                  currentOperation = buttonValue;
                  display.innerText += buttonValue;
              } else {
                  // Замена последней операции новой
                  if (isOperation && ['+', '-', '*', '/'].includes(display.innerText.slice(-1))) {
                      display.innerText = display.innerText.slice(0, -1) + buttonValue;
                      currentOperation = buttonValue;
                  }
              }
          } else if (buttonValue === 'C') {
              display.innerText = '0';
              currentOperation = null;
              firstOperand = null;
          } else if (buttonValue === '=') {
              if (currentOperation && firstOperand !== null) {
                  const expression = display.innerText;
                  const secondOperand = expression.substring(firstOperand.length + 1);
                  if (secondOperand !== '') {
                      try {
                          const result = eval(expression);
                          display.innerText = result.toString();
                      } catch {
                          display.innerText = 'Error';
                      }
                  }
              }
              currentOperation = null;
              firstOperand = null;
          } else {
              if (display.innerText === '0') {
                  display.innerText = buttonValue;
              } else {
                  display.innerText += buttonValue;
              }
          }
      });
  });
});