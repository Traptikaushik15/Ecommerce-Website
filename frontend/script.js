// Handling the Login form submission
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please fill in all fields');
        return;
    }

    const loginData = {
        username,
        password
    };

    // AJAX Request
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
            if (data === 'Login successful') {
                window.location.href = '/dashboard'; // Redirect to the dashboard
            }
        })
        .catch(error => {
            alert('An error occurred: ' + error);
        });
});
