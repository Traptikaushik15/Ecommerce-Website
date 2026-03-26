import axios from "axios";
import createAlert from "./utils";

if (document.getElementById("__login-btn")) {
  document
    .getElementById("__login-btn")
    .addEventListener("click", async (e) => {
      e.preventDefault();
      const loginForm = document.getElementById("__login-form");
      const loginUsername = document.getElementById("__login-username").value;
      const loginPassword = document.getElementById("__login-password").value;

      if (!loginUsername || !loginPassword) {
        createAlert("danger", "Fill all credentials!");
        return;
      }

      login(loginUsername.trim(), loginPassword.trim());
    });
}

if (document.getElementById("__logout-btn")) {
  document.getElementById("__logout-btn").addEventListener("click", () => {
    logout();
  });
}

async function login(username, password) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/users/login",
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    console.log(response);

    if (response.status && response.status == 200) {
      createAlert("success", "Logged in successfully!");
    }

    setTimeout(() => {
      window.location.href = "http://localhost:3001/index.html";
    }, 2000);
  } catch (err) {
    console.log(err);
    createAlert("danger", "Wrong credentials");
  }
}

async function logout() {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/users/logout",
      { withCredentials: true }
    );

    setTimeout(() => {
      window.location.href = "http://localhost:3001/index.html";
    }, 1000);
  } catch (err) {
    console.log(err);
  }
}
