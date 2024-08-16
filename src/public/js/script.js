// Email regular expression for basic validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password regular expression:
// At least one uppercase letter, one lowercase letter, one number, and one special character
// and at least 8 characters long
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  let email = document.getElementById('loginEmail').value;
  let password = document.getElementById('loginPassword').value;
  let valid = true;

  if (email === '') {
    document.getElementById('loginEmailError').textContent =
      'Email is required';
    valid = false;
  } else if (!emailRegex.test(email)) {
    document.getElementById('loginEmailError').textContent =
      'Invalid email format';
    valid = false;
  } else {
    document.getElementById('loginEmailError').textContent = '';
  }

  if (password === '') {
    document.getElementById('loginPasswordError').textContent =
      'Password is required';
    valid = false;
  } else if (!passwordRegex.test(password)) {
    document.getElementById('loginPasswordError').textContent =
      'Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character';
    valid = false;
  } else {
    document.getElementById('loginPasswordError').textContent = '';
  }

  if (valid) {
    e.target.submit();
    console.log('Login form is valid');
  }
});

document
  .getElementById('registerForm')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let name = document.getElementById('registerName').value;
    let email = document.getElementById('registerEmail').value;
    let password = document.getElementById('registerPassword').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let valid = true;

    if (name === '') {
      document.getElementById('registerNameError').textContent =
        'Name is required';
      valid = false;
    } else {
      document.getElementById('registerNameError').textContent = '';
    }

    if (email === '') {
      document.getElementById('registerEmailError').textContent =
        'Email is required';
      valid = false;
    } else if (!emailRegex.test(email)) {
      document.getElementById('registerEmailError').textContent =
        'Invalid email format';
      valid = false;
    } else {
      document.getElementById('registerEmailError').textContent = '';
    }

    if (password === '') {
      document.getElementById('registerPasswordError').textContent =
        'Password is required';
      valid = false;
    } else if (!passwordRegex.test(password)) {
      document.getElementById('registerPasswordError').textContent =
        'Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character';
      valid = false;
    } else {
      document.getElementById('registerPasswordError').textContent = '';
    }

    if (confirmPassword === '') {
      document.getElementById('confirmPasswordError').textContent =
        'Confirm password is required';
      valid = false;
    } else if (password !== confirmPassword) {
      document.getElementById('confirmPasswordError').textContent =
        'Passwords do not match';
      valid = false;
    } else {
      document.getElementById('confirmPasswordError').textContent = '';
    }

    if (valid) {
      // Submit the form or proceed with the registration
      e.target.submit();
      // Clear the input fields
      e.target.reset();
    }
  });

function copyToClipboard(text) {
  navigator.clipboard.writeText(window.location.origin + '/' + text).then(
    function () {
      alert('Copied to clipboard');
    },
    function (err) {
      alert('Failed to copy: ', err);
    }
  );
}
