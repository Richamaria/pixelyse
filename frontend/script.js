const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    //  You'll need to implement authentication logic here
    //  This is just a placeholder example.
    //  You would typically use a backend service to authenticate users.
    if (username === 'admin' && password === 'password') {
        //  Successful authentication - redirect to the home page
        window.location.href = 'index.html'; // Replace with actual home page URL
    } else {
        errorMessage.textContent = 'Invalid username or password';
    }
});