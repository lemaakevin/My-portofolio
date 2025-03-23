const form = document.getElementById('contact-form');
console.log('Form element:', form); // Debugging

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log('Form submitted'); // Debugging

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log('Form data:', { name, email, message }); // Debugging

    fetch('http://localhost:5000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    })
      .then((response) => {
        console.log('Response received:', response); // Debugging
        return response.text();
      })
      .then((data) => {
        console.log('Data:', data); // Debugging
        document.getElementById('form-status').textContent = data;
        document.getElementById('contact-form').reset();
      })
      .catch((error) => {
        console.error('Error:', error); // Debugging
        document.getElementById('form-status').textContent = 'Failed to send message. Please try again.';
      });
      const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

// Real-time validation
nameInput.addEventListener('input', () => validateField(nameInput, 'name-error'));
emailInput.addEventListener('input', () => validateField(emailInput, 'email-error'));
messageInput.addEventListener('input', () => validateField(messageInput, 'message-error'));

// Form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Validate all fields before submission
  const isNameValid = validateField(nameInput, 'name-error');
  const isEmailValid = validateField(emailInput, 'email-error');
  const isMessageValid = validateField(messageInput, 'message-error');

  if (isNameValid && isEmailValid && isMessageValid) {
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'Sending...';
    submitBtn.querySelector('.loading-spinner').style.display = 'inline-block';

    try {
      // Send form data to backend
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameInput.value,
          email: emailInput.value,
          message: messageInput.value,
        }),
      });

      const data = await response.text();

      // Show success message
      formStatus.textContent = data;
      formStatus.style.color = '#1abc9c';
      form.reset();
    } catch (error) {
      // Show error message
      console.error('Error:', error);
      formStatus.textContent = 'Failed to send message. Please try again.';
      formStatus.style.color = '#ff6b6b';
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = 'Send Message';
      submitBtn.querySelector('.loading-spinner').style.display = 'none';
    }
  }
});

// Field validation function
function validateField(input, errorId) {
  const errorMessage = document.getElementById(errorId);

  if (!input.value.trim()) {
    errorMessage.textContent = 'This field is required';
    return false;
  }

  if (input.type === 'email' && !validateEmail(input.value)) {
    errorMessage.textContent = 'Please enter a valid email address';
    return false;
  }

  errorMessage.textContent = '';
  return true;
}

// Email validation helper function
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
  });
} else {
  console.error('Form element not found'); // Debugging
}