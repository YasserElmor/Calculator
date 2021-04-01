const screen_upper = document.querySelector('.upper-screen'),
  screen_lower = document.querySelector('.lower-screen'),
  ac = document.querySelector('.ac'),
  del = document.querySelector('.del'),
  equal = document.querySelector('.equal'),
  numbers = document.querySelectorAll('.number'),
  operators = document.querySelectorAll('.operator');

  
numbers.forEach(number => {
  number.addEventListener('click', () => {
    screen_lower.textContent += addNumberToScreen(number, screen_lower);
  });
});

operators.forEach(operator => {
  operator.addEventListener('click', () => {
    screen_upper.textContent = addOperatorToScreen(operator, screen_lower, screen_upper);
  });
});

ac.addEventListener('click', clear_screen);

del.addEventListener('click', () => {
  screen_lower.textContent = delete_character(screen_lower);
});

equal.addEventListener('click', () => {
  if(screen_upper.textContent && screen_lower.textContent){
    const output = final_result();
    screen_lower.textContent = output;
  }
  return;
})



/**
 * The addNumberToScreen function takes an HTML element containing a number and concatenates it to the lower screen div inner text
 * @param {HTMLElement} number is the number to be displayed on the screen after the click event
 * @param {HTMLElement} screen is the string within the lower displaying div 
 */
function addNumberToScreen(number, screen) {
  if (number.textContent === '.' && screen.textContent.includes('.')) {
    return '';
  }
  return number.textContent;
};


/**
 * The addNumberToScreen function takes an HTML element containing an operator, concatenates it to the lower screen div inner text, clears both screen divs
 * and displays the output on the upper screen div
 * @param {HTMLElement} operator is the operator to be displayed on the screen after the click event
 * @param {HTMLElement} screen_lower is the string within the lower displaying div
 * @param {HTMLElement} screen_upper is the string within the uper displaying div
 */
function addOperatorToScreen(operator, screen_lower, screen_upper) {

  const upper_screen_value = screen_upper.textContent;
  const upper_screen_op = upper_screen_value.split(' ')[1];
  const operator_value = operator.textContent;

  if (screen_upper.textContent && screen_lower.textContent) {
    return (final_result() + ' ' + operator_value);
  }
  if (upper_screen_op) {
    const new_upper_value = upper_screen_value.slice(0, upper_screen_value.length - 2) + ' ' + operator_value;
    return new_upper_value;
  }


  const upper_screen_data = screen_lower.textContent + " " + operator_value;
  clear_screen();
  return upper_screen_data;
};

//clears the upper and lower screen divs
function clear_screen() {
  screen_upper.textContent = '';
  screen_lower.textContent = '';
}

//deletes one character off of the lower screen text
function delete_character(screen) {
  return screen.textContent.slice(0, -1);
}

function final_result() {
  const upper_value = screen_upper.textContent;
  const lower_value = screen_lower.textContent;
  const first_operand = parseFloat(upper_value.trim().slice(0, upper_value.length));
  const second_operand = parseFloat(lower_value);
  const operator = upper_value.slice(-1);
  clear_screen();
  switch (operator) {
    case '+':
      return first_operand + second_operand;
    case '-':
      return first_operand - second_operand;
    case '×':
      return first_operand * second_operand;
    case '÷':
      return first_operand / second_operand;
    default:
      alert('error');
  }

}