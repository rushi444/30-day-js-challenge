const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show Input Error Message
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
};

// Show Success outline
const showSuccess = input => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};

// Check if Email is Valid
const checkEmail = input => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  re.test(input.value.trim())
    ? showSuccess(input)
    : showError(input, 'Email is not valid');
};

// Check Required Fields
const checkRequired = inputArr => {
  inputArr.forEach(input => {
    input.value.trim() === ''
      ? showError(input, `${getFieldName(input)} is required`)
      : showSuccess(input);
  });
};

// Check Input Length
const checkLength = (input, min, max) => {
  input.value.length < min
    ? showError(
        input,
        `${getFieldName(input)} must be at least ${min} characters`,
      )
    : input.value.length > max
    ? showError(
        input,
        `${getFieldName(input)} must be less than ${max} characters`,
      )
    : showSuccess(input);
};

// Check if passwords match
const checkPasswordsMatch = (input1, input2) => {
  input1.value !== input2.value && showError(input2, 'Passwords do not Match');
};

// Get Field Name
const getFieldName = input => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// Event Listeners
form.addEventListener('submit', e => {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
