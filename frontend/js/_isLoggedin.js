function getCookie(name) {
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  console.log(cookies);
  for (let cookie of cookies) {
    if (cookie.startsWith(`${name}=`)) {
      return cookie.split("=")[1];
    }
  }
  return null;
}

const user = getCookie("user");

if (user) {
  // Display the logout button and greeting
  const logoutButton = document.getElementById("__logout-btn");
  const userGreeting = document.getElementById("__user-greeting");
  const accountLink = document.getElementById("__account-link");

  if (logoutButton) logoutButton.style.display = "inline-block"; // Show the logout button

  if (userGreeting) {
    userGreeting.style.display = "inline"; // Show the greeting
    userGreeting.textContent = `Hi ${decodeURIComponent(user)}!`; // Display the username from the cookie
  }

  if (accountLink) accountLink.style.display = "none"; // Hide the account link
}

export default user;
