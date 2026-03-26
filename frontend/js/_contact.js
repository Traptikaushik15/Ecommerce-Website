import createAlert from "./utils";

if (document.getElementById("__contact-btn")) {
  document.getElementById("__contact-btn").addEventListener("click", () => {
    const contactName = document.getElementById("__contact-name").value;
    const contactMessage = document.getElementById("__contact-message").value;
    const contatctEmail = document.getElementById("__contact-email").value;

    if (!contactName || !contactMessage || !contatctEmail) {
      createAlert("danger", "Fill all data!");
      return;
    }

    createAlert("success", "Will reach to you shortly!");

    setTimeout(() => {
      window.location.href = "http://localhost:3001/index.html";
    }, 2000);
  });
}
