document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Clear previous errors
    document.querySelectorAll('.error').forEach(function(error) {
        error.textContent = '';
    });
    
    // Form validation
    var valid = true;
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var terms = document.getElementById('terms').checked;

    if (name === '') {
        valid = false;
           // Handle name error
        }

        if (email === '') {
            valid = false;
            // Handle email error
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            valid = false;
            // Handle invalid email error
        }

        if (password === '') {
            valid = false;
            // Handle password error
        }

        if (confirmPassword === '') {
            valid = false;
            // Handle confirm password error
        } else if (password !== confirmPassword) {
            valid = false;
            // Handle password mismatch error
        }

        if (!terms) {
            valid = false;
            // Handle terms not accepted error
        }

        if (valid) {
            // Submit form or handle successful validation
            alert('Form submitted successfully!');
            // e.g., use fetch() to send data to the server
        }
    });