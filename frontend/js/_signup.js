import axios from "axios";
import createAlert from "./utils";
if (document.getElementById("__signup-btn")) {
  document
    .getElementById("__signup-btn")
    .addEventListener("click", async (e) => {
      e.preventDefault();
      const signupForm = document.getElementById("__signup-form");
      const signupUsername = document.getElementById("__signup-username").value;
      const signupPassword = document.getElementById("__signup-password").value;

      if (!signupUsername || !signupPassword) {
        createAlert("danger", "Fill all credentials!");
        return;
      }

      signup(signupUsername.trim(), signupPassword.trim());
    });
}

async function signup(username, password) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/users/signup",
      {
        username,
        password,
      }
    );
    if (response.status && response.status == 200) {
      createAlert("success", "User successfully created!");
    } else {
      createAlert("danger", "User already exists");
    }

    setTimeout(() => {
      window.location.href = "http://localhost:3001/login.html";
    }, 2000);
  } catch (err) {
    console.log(err);
    createAlert("danger", "Something went wrong!");
  }
}
