const express = require('express');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Define path for database file (JSON)
const dbPath = path.join(__dirname, 'database.json');

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for rendering login page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

// Route for user login authentication
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const data = fs.readFileSync(dbPath, 'utf-8');
        const users = JSON.parse(data).users;

        const user = users.find(user => user.username === username);

        if (!user) {
            return res.status(400).send('User not found');
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            res.send('Login successful');
        } else {
            res.status(400).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Route to handle user signup (for Sign-Up page)
app.get('/sign_in.html', (req, res) => {
    res.sendFile(__dirname + '/sign_in.html');
});


app.post('/sign_in', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const data = fs.readFileSync(dbPath, 'utf-8');
        const users = JSON.parse(data).users;

        // Check if the username already exists
        const userExists = users.some(user => user.username === username);
        if (userExists) {
            return res.status(400).send('User already exists');
        }

        // Add the new user
        const newUser = { username, password: hashedPassword };
        users.push(newUser);

        // Write the updated data back to the database
        fs.writeFileSync(dbPath, JSON.stringify({ users }, null, 2));

        res.send('Sign-up successful');
    } catch (error) {
        res.status(500).send('Error during signup');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
